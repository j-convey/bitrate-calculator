# Bitrate Calculator

This is a web-based bitrate calculator designed to help users estimate and adjust video bitrates based on various encoding and resolution parameters. It allows users to input video duration, file size, and desired output settings to get an idea of optimal bitrates for video encoding.

## Features

*   **Calculate Bitrate:** Input video duration (hours, minutes, seconds) and file size (GB) to get the average bitrate in kbps and Mbps.
*   **Encoding Options:** Choose the current encoding and the target encoding (h264, h265, av1).
*   **Resolution Options:** Select the current and target resolutions (SD, HD, UHD).
*   **Adjusted Bitrate:** Get a recommended and ideal bitrate based on the selected encoding and resolution changes.
*   **Drag and Drop:** Drag and drop a video file to automatically fill in the duration and file size.
*   **User-Friendly Interface:** Clean and intuitive design with a dark mode theme.
*  **Github link**: A link to the source code in the header.
*  **Tooltip**: Hover over tooltip that describes drag and drop functionality.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **CSS:** For styling and layout (using a dark mode theme).
*   **Font Awesome:** For icons.
*  **JavaScript**: Used to extract metadata from video files.
*  **npm**: The node package manager, used to install, uninstall and manage dependancies.
*  **webpack**: This is a module bundler, and is used by `react-scripts` to bundle the code for the application.
*  **react-scripts**: These are the main tools used for building react applications in the create-react-app environment.

## Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/j-convey/bitrate-calculator.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd bitrate-calculator
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```
    or
     ```bash
     yarn install
     ```
4.  **Start the development server:**
    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```
    This will start the application and automatically open in your browser. The application will be available at http://localhost:3000.

## Usage

1.  **Input video details:**
    *   Enter the video's duration in hours, minutes, and seconds using the number inputs.
    *   Enter the video's file size in gigabytes (GB) using the text input.
     * You can also drag and drop a video file into the input boxes to automatically fill in the time and size.
2.  **Choose encoding options:**
    *   Select the current encoding from the options (h264, h265, av1).
    *   Select the encoding you want to convert to from the options (h264, h265, av1).
3.  **Choose resolution options:**
    * Select the current resolution from the options (SD, HD, UHD).
    * Select the target resolution from the options (SD, HD, UHD).

4.  **Calculate Bitrate:** Click the "Calculate Bitrate" button to calculate the average bitrate for the input file size and duration.
5. **View Results:** The average bitrate will be displayed in kbps and Mbps.
6.  **Adjusted Bitrate:** After selecting the encoding options, you will be presented with two bitrates: a recommended bitrate that includes wiggle room to prevent loss of quality, and a more aggressive "ideal bitrate" which may result in quality loss. Note that these values may not result in a consistent file size.

## Testing

You can test the application by visiting this site:

[https://bitrate-calculator.pages.dev/](https://bitrate-calculator.pages.dev/)

This is a live and publicly available version of this application, which is hosted on GitHub pages. Feel free to use this to test how the application works.

## Contribution

Feel free to fork the project and submit pull requests to contribute to this project!

## License

This project is open source.