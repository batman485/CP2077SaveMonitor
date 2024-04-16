# Cyberpunk 2077 Save Monitor
Monitor you Cyberpunk 2077 save files before they are dead

In Cyberpunk 2077 there is currenty a bug where your save file will become corrupted if it goes over 8MB in size. This app will monitor your save files and alert you when you are getting close to the save file size limit. GoG Support Article on this issue:
[https://support.gog.com/hc/en-us/articles/360016743298-Cyberpunk-2077-Saved-data-is-damaged-and-cannot-be-loaded?product=gog](https://support.gog.com/hc/en-us/articles/360016743298-Cyberpunk-2077-Saved-data-is-damaged-and-cannot-be-loaded?product=gog)

UPDATE: As of version 1.06 this bug has been fixed. As noted by CD Project Red: The 8MB save size limit was removed in 1.06 version of the game. Previously damaged save files will remain this way. Further investigation why the save files are bigger than expected is ongoing.

## Setup
1. Download the latest release.
2. Install Cyberpunk 2077 Save Monitor and open the app.
3. Click on Save Location on the left and select the folder where your save files for Cyberpunk 2077 are located.

## Building from Source
### Prerequisites
Cyberpunk 2077 Save Monitor was built on Electron Forge which uses Makers that are configured in the package.json file. To learn more about configuration of makers and for distributions for other platforms, you can view their documentation at [https://www.electronforge.io/config/makers](https://www.electronforge.io/config/makers) 

### How to Build
1. If you just downloaded or cloned the repository, run the install command to download the dependencies:
    yarn
    ```
    yarn install
    ```
    npm
    ```
    npm install
    ```
2. Run the make command to create the distribution package:
    yarn
    ```
    yarn make
    ```
    npm
    ```
    npm make
    ```
3. This will create the distrbution packages that are defined in the makers section of the package.json.