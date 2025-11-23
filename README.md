# Facility Finder - Coding Challenge

## Overview

Facility Finder is a React Native application built with Expo that allows users to browse and search through various facilities. Users can view detailed information about each facility, including amenities and location on a map.

## Technologies Used

- **React Native** (0.81.5) - Cross-platform mobile development
- **Expo** (~54.0.13) - Development platform and tooling
- **Expo Router** (~6.0.15) - File-based navigation system
- **@shopify/flash-list** (^2.2.0) - High-performance list component (optimised replacement for FlatList)
- **@tanstack/react-query** (^5.90.10) - Data fetching and state management
- **React Native Maps** (~1.20.1) - Map integration for location preview
- **TypeScript** (~5.9.2) - Type-safe development
- **Jest** & **@testing-library/react-native** - Testing framework

## Features

✅ **Facility List** - Browse all available facilities with smooth scrolling performance  
✅ **Search Functionality** - Search facilities by name in real-time  
✅ **Facility Details** - View comprehensive information about each facility  
✅ **Map Preview** - See the facility location on an interactive map  
✅ **Amenities Display** - Browse all available amenities for each facility

## Installation

Install all dependencies:

```bash
npm i
```

## Running Tests

Run the test suite:

```bash
npm run test
```

## Running the App

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

### Development Server

To start the Expo development server:

```bash
npm start
```

## Project Structure

```
facility-finder/
├── api/              # API layer for data fetching
├── app/              # Expo Router pages
│   ├── facilities/   # Facility detail pages
│   └── index.tsx     # Home/List page
├── components/       # Reusable UI components
│   └── __tests__/    # Test files
├── assets/           # Static assets and data
```

## Requirements

- Node.js (LTS version recommended)
- npm
- Xcode (for iOS development)
- Android Studio (for Android development)
