---
name: sphereserver-crossplatform
description: Comprehensive cross-platform engineering, CMake toolchain standards, and CI coordination for SphereServer (Source-X) across Windows (MSVC), Linux (x86_64, x86 i386, ARM64/Raspberry Pi), Clang/GCC, CodeQL, and AppVeyor.
metadata:
  origin: UOAscension
---

# SphereServer Cross-Platform Engineering & CI Standards

This standard establishes the mandatory coding patterns, CMake toolchain guidelines, multiarch CI configurations, and pre-commit verification protocols required to keep SphereServer (`Source-X`) fully aligned and buildable across Windows, Linux (x86_64, x86 32-bit, ARM64), macOS, and GitHub Actions / AppVeyor workflows.

---

## 1. Supported Platform Matrix & Toolchains

All code, toolchains, and CI workflows focus exclusively on **64-bit architectures** in **Nightly**, **Release**, and **Debug** profiles (legacy 32-bit x86 builds are deprecated and removed from CI):

| Platform / Architecture | Compiler / Toolchain | CI Runner / Job | Key Constraints & Requirements |
| :--- | :--- | :--- | :--- |
| **Windows x86_64** | MSVC (Visual Studio 2022) | `build_windows_x86_64.yml`, AppVeyor | C++20, static runtime / DLL bundling (`libmariadb.dll`, `sphere.ini`), UTF-8 paths |
| **Linux x86_64** | GCC 12+ / Clang 16+ | `build_linux_x86_64.yml`, `build_linux_asan.yml` | C++20, `-Werror`, ASan/UBSan sanitizers, thread tracking |
| **Linux ARM64** (AArch64) | GCC (`aarch64-linux-gnu-g++`) | `build_linux_arm64.yml` (Raspberry Pi 64-bit) | Debian/Ubuntu `ports.ubuntu.com` APT routing, strict alignment |
| **macOS AppleClang** | AppleClang 15+ (x86_64 & ARM64) | `build_osx_x86_64.yml`, `build_osx_arm.yml` | Homebrew MariaDB connector paths, Darwin library naming |
| **Static Code Analysis** | GitHub CodeQL & Coverity | `codeql.yml`, `build_coverity.yml` | Node 24 runtime, zero diagnostic export failures |

---

## 2. Portable C++20 Coding Standards

### 2.1 Standard Math (`<cmath>` and `std::` Namespace)
> **RULE 2.1**: NEVER call standard math functions without `#include <cmath>` and NEVER call them unqualified in the global namespace.

- **Bad (Breaks GCC 12+ / Clang in Linux)**:
  ```cpp
  // Missing #include <cmath> or calling C math:
  int dist = sqrt(dx * dx + dy * dy);
  int rounded = ceil(val);
  ```
- **Good (Cross-Platform Portable)**:
  ```cpp
  #include <cmath>
  
  int dist = static_cast<int>(std::sqrt(dx * dx + dy * dy));
  int rounded = static_cast<int>(std::ceil(val));
  ```

---

### 2.2 String Operations & Cross-Platform Case Insensitivity
> **RULE 2.2**: NEVER use MSVC-specific string macros (`_strnicmp`, `_stricmp`, `_strcmpi`, `_strrev`). ALWAYS use SphereServer's portable wrappers defined in `sstring.h` or standard C++ algorithms.

- **Available SphereServer String Macros (`sstring.h`)**:
  - `strnicmp(s1, s2, n)`: Resolves to `_strnicmp` on Windows and `strncasecmp` on POSIX/Linux.
  - `strcmpi(s1, s2)`: Resolves to `_strcmpi` on Windows and `strcasecmp` on POSIX/Linux.
  - `Str_CompareI(s1, s2)` / `Str_CompareNI(s1, s2, n)`: High-performance case-insensitive comparison.
  - `Str_Reverse(str)`: Cross-platform string reversal.

- **Example**:
  ```cpp
  // Correct HTTP / protocol header matching:
  if (strnicmp(line, "Authorization:", 14) == 0)
  {
      // ...
  }
  ```

---

### 2.3 DLL Exports & Shared Library Macros
> **RULE 2.3**: Whenever defining shared library exports (e.g. `services/login-crypto`), ALWAYS guard the export macro with `#ifndef` in `.cpp` files to prevent MSVC `warning C4005: macro redefinition` when CMake injects target compile definitions.

- **Header (`sphere_login_crypto.h`)**:
  ```cpp
  #if defined(_WIN32)
  #  if defined(SPHERE_LOGIN_CRYPTO_EXPORTS)
  #    define SPHERE_LOGIN_CRYPTO_API __declspec(dllexport)
  #  else
  #    define SPHERE_LOGIN_CRYPTO_API __declspec(dllimport)
  #  endif
  #else
  #  define SPHERE_LOGIN_CRYPTO_API __attribute__((visibility("default")))
  #endif
  ```

- **Source (`sphere_login_crypto.cpp`)**:
  ```cpp
  #ifndef SPHERE_LOGIN_CRYPTO_EXPORTS
  #define SPHERE_LOGIN_CRYPTO_EXPORTS
  #endif
  #include "sphere_login_crypto.h"
  ```

---

### 2.4 Explicit Standard Headers (Prevent Missing Transitive Inclusions)
> **RULE 2.4**: Always explicitly `#include` required C++ standard library headers. MSVC and GCC include different transitive headers; relying on implicit inclusion causes random CI failures on other compilers.

- When using `std::string_view` with streams: `#include <ostream>`
- When using `std::optional`: `#include <optional>`
- When using `std::span`: `#include <span>`
- When using `std::unique_ptr` / `std::shared_ptr`: `#include <memory>`
- When using `std::numeric_limits`: `#include <limits>`

---

### 2.5 Testing Invariants & Intentional Warning Suppression (Clang `-Wself-assign-overloaded`)
> **RULE 2.5**: When writing unit tests that deliberately invoke edge conditions (such as self-assignment `obj = obj` to test `operator=`), ALWAYS suppress the corresponding compiler warning with localized pragmas so `-Werror` does not fail the build.

```cpp
#if defined(__clang__)
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wself-assign-overloaded"
#pragma clang diagnostic ignored "-Wself-assign"
#endif
    ref = ref;
#if defined(__clang__)
#pragma clang diagnostic pop
#endif
```

---

## 3. CMake Toolchain Standards

Toolchain files are located in `cmake/toolchains/include/`:
- `Linux-GNU_common.inc.cmake`
- `Linux-Clang_common.inc.cmake`
- `Windows-MSVC.cmake`
- `OSX-AppleClang_common.inc.cmake`

### 3.1 Robust Library Linking & `find_library` Fallback
> **RULE 3.1**: When searching for dynamic/static external libraries (such as MariaDB or `dl`), NEVER pass `find_library` results directly into `target_link_libraries` without verifying they did not evaluate to `-NOTFOUND`.

- **Standard Implementation Pattern**:
  ```cmake
  if(lib_mariadb_with_path)
      set(link_mariadb ${lib_mariadb_with_path})
  else()
      set(link_mariadb mariadb)
  endif()

  if(lib_dl_with_path)
      set(link_dl ${lib_dl_with_path})
  else()
      set(link_dl dl)
  endif()

  foreach(tgt ${TARGETS})
      target_compile_options(${tgt} PRIVATE ${cxx_compiler_options_common})
      target_compile_definitions(${tgt} PRIVATE ${cxx_compiler_definitions_common})
      target_link_options(${tgt} PRIVATE ${cxx_linker_options_common})
      if(lib_search_paths)
          target_link_directories(${tgt} PRIVATE ${lib_search_paths})
      endif()
      target_link_libraries(${tgt} PRIVATE ${link_mariadb} ${link_dl})
  endforeach()
  ```

---

### 3.2 Multi-Target Custom Flags (Nightly, Release, Debug)
In MSVC and GCC/Clang, custom configurations (such as `Nightly`) require explicit flag variables in `Windows-MSVC.cmake`:
```cmake
set(CMAKE_CXX_FLAGS_NIGHTLY "${CMAKE_CXX_FLAGS_RELEASE}" CACHE STRING "Flags used by the C++ compiler during Nightly builds." FORCE)
set(CMAKE_SHARED_LINKER_FLAGS_NIGHTLY "${CMAKE_SHARED_LINKER_FLAGS_RELEASE}" CACHE STRING "Flags used by the shared linker during Nightly builds." FORCE)
set(CMAKE_STATIC_LINKER_FLAGS_NIGHTLY "${CMAKE_STATIC_LINKER_FLAGS_RELEASE}" CACHE STRING "Flags used by the static linker during Nightly builds." FORCE)
set(CMAKE_MODULE_LINKER_FLAGS_NIGHTLY "${CMAKE_MODULE_LINKER_FLAGS_RELEASE}" CACHE STRING "Flags used by the module linker during Nightly builds." FORCE)
set(CMAKE_EXE_LINKER_FLAGS_NIGHTLY "${CMAKE_EXE_LINKER_FLAGS_RELEASE}" CACHE STRING "Flags used by the linker during Nightly builds." FORCE)
```

---

## 4. GitHub Actions Multiarch CI Architecture

### 4.1 Ubuntu 24.04 (Noble) deb822 Multiarch APT Resolution
On Ubuntu 24.04 runners, `apt` uses `/etc/apt/sources.list.d/ubuntu.sources`. When adding a secondary foreign architecture like `arm64`, the main mirror will fail with HTTP 404 for ARM64 binaries unless explicitly scoped.

- **The Standard Multiarch APT Fix (`build_linux_arm64.yml`)**:
  ```yaml
  - name: Configure Multiarch APT Repositories for ARM64
    run: |
      sudo dpkg --add-architecture arm64
      # Restrict default sources to amd64 and i386:
      sudo sed -i 's/^Types: deb/Architectures: amd64 i386\nTypes: deb/' /etc/apt/sources.list.d/ubuntu.sources
      # Add dedicated ports mirror for arm64:
      sudo tee /etc/apt/sources.list.d/arm64.sources << 'EOF'
      Types: deb
      URIs: http://ports.ubuntu.com/ubuntu-ports/
      Suites: noble noble-updates noble-backports noble-security
      Components: main restricted universe multiverse
      Architectures: arm64
      Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
      EOF
      sudo apt-get update
  ```

---

### 4.2 Deprecation & Removal of 32-bit (x86) Architecture
Legacy 32-bit (x86) builds are officially deprecated and removed from GitHub Actions CI:
- **Rationale**: Modern game server hosting, 64-bit memory indexing, POSIX 64-bit time representations (`time_t`), and upstream Linux distributions (such as Ubuntu 24.04+) have deprecated or pruned 32-bit multilib package ecosystems.
- **CI Enforcement**: Workflows `build_linux_x86.yml` and `build_win_x86.yml` are deleted. All PR and Nightly builds target `x86_64` (AMD64) and `AArch64` (ARM64).

---

### 4.3 Node 24 Runtime for GitHub Actions Workflows
In modern GitHub Actions runners, set the environment variable to ensure compatibility:
```yaml
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

---

## 5. Local Pre-Commit Verification Workflow

Developers must always verify builds and tests locally before committing.

### 5.1 Windows
Run the automated batch test runner from `Source-X`:
```cmd
utilities\run-local-tests.bat
```
This builds SphereServer x64 Nightly with `UNIT_TESTING=ON` and executes all unit tests via CTest.

### 5.2 Linux / WSL
Run the bash test runner from `Source-X`:
```bash
./utilities/run-local-tests.sh
```

---

## 6. Strict Development Invariants
1. **NEVER push to remote without explicit user consent.**
2. **NEVER bypass compiler warnings with `-Wno-error` unless strictly necessary for a third-party submodule under `lib/`.**
3. **Keep CTest working directory aligned with `$<TARGET_FILE_DIR:${tgt}>` so test binaries can discover necessary runtime assets and configs (`sphere.ini`, DLLs).**
