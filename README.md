# The Contactor

## Description

This project is a Contacts Application created as part of Throuinn Smaforitta. The native Contactor app for iOS and Android has been wiped out, and our team was tasked by the IMDC (International Mobile Device Committee) to develop a replacement contact manager. This application is designed to replace the original contacts manager temporarily, with features that allow users to create, view, search, and manage their contacts efficiently.

## Table of Contents

- Installation // Running the App
- Features
- Technologies Used
- Platform Support
- Project Structure
- Setup Instructions
- Testing
- Known Issues
- Future Improvements

## Installatio // Running the App
### Navigate to project directory by cloning github url
`git clone https://github.com/hlynurisak/contactor.git`
`cd contactor`
### Install dependencies
`npm install expo`
### Running the App
`Npx expo start`
- This will start the Expo development server. You can then use the Expo Go app on your mobile device.

## Features
### Contacts List: Users can see a list of all saved contacts, displayed alphabetically. 
- Only the contact's name and thumbnail photo are displayed in the list.

### Search Contacts: Users can search through their saved contacts by name. 
- Dynamic filtering is applied while typing, allowing for quick searches. 
- Search is case-insensitive and works with partial matches.

### Create New Contact: Users can create new contacts via a simple form. 
- Contacts are saved as JSON files in the filesystem. 
- Each contact includes a name, phone number, and an optional photo.

### Detailed Contact View: Users can view more detailed information for each contact by pressing on contact name/their pfp. 
- This includes contact name, phone number, and a larger profile picture.

### Edit Contacts: Users can edit the details of an existing contact. 
- The corresponding contact file is updated with the new information.

### Add Photos: Users can add a profile picture to their contacts. 
- Photos can be imported from the device’s media library or taken directky with phones' camera.


## Technologies Used
- React Native
- Expo

## Platform Support
### Primary Development Platform
- Primary Platform: iOS
- Test Device: Only IOS Devices

### Secondary Platform Testing
- Secondary Platform: Google Chrome for MacOS

## Prerequisites
- Node.js (v14 or higher)
- npm
- Expo CLI (npm install -g expo-cli)
- Xcode (for iOS development)

## File Structure
### src/components/: Contains all UI components, such as ContactsList, EditInformationScreen, InformationScreen, NewContactModal, and SearchBar.
- Each component folder includes index.js and styles.js for separation of logic and styling.
### src/services/: Contains utility functions in fileService.js which handle reading/writing contacts from/to the file system.

## Code Style and Best Practices
- The project follows the Single Responsibility Principle, with components and services focused on one task each.
- Two spaces for consistent indentation
- Folder Structure is organized to align with course guidelines for easy navigation.

## How to Use
### Viewing Contacts: 
- Launch the app, and all saved contacts will be displayed.
### Adding a Contact: 
- Click on the "Add Contact" button to open the contact form, fill in the details, and save.
### Searching Contacts:
- Use the search bar to find specific contacts by name.
### Editing Contact Details: 
- Tap a contacts name to view and edit their information.

## Known Issues
- The search functionality is currently limited to the contact name only.
- A side effect of the modals can under some circumstances show another contact than the one selected for a very brief period when opening or closing a modal.

## Future Improvements
- Favorites Feature: Add the ability to mark contacts as favorites for easy access.
- Grouping Contacts: Group contacts alphabetically to improve navigating through many contacts.

## Authors
### This project was created by:
- Arna Guðjónsdóttir
- Emilie Victoria Bönström
- Hlynur Ísak Vilmundarson
- Róbert Orri Árnason

## License
- This project is licensed under the MIT License. See the LICENSE file for more details.