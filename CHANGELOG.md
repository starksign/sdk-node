# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to the following versioning pattern:

Given a version number MAJOR.MINOR.PATCH, increment:

- MAJOR version when the **API** version is incremented. This may include backwards incompatible changes;
- MINOR version when **breaking changes** are introduced OR **new functionalities** are added in a backwards compatible manner;
- PATCH version when backwards compatible bug **fixes** are implemented.

## [Unreleased]

## [0.0.3] - 2023-08-07
### Fixed
- missing "starksign" folder in the final package

## [0.0.2] - 2023-07-28
### Fix
- imports errors

## [0.0.1] - 2023-07-28
### Added
- SignatureRequest resource with parse() method
- Document resource with get() and sign() methods
- document.Signature resource
- document.Signer resource