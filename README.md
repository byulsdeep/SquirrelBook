# SquirrelBook

[Click here to launch!](https://byulsdeep.github.io/SquirrelBook/)

SquirrelBook is a web application developed by Total Commander and Admiral of the Three Kingdoms - Kang Han Byul, slave - Kwon Danbi, and slave - So SunYeong. It is designed to provide a social networking platform with additional features such as mini-games. The project utilizes JQuery and Bootstrap frameworks.

## Features

### HOME

The home page of SquirrelBook includes the following sections:

- Navbar: A Bootstrap-based navbar for easy navigation.
- Banner: Utilizes Bootstrap Carousel for showcasing images and announcements.
- Quick Access: Provides links to friend lists, mini-games, and other sections for quick navigation.
- Weekly Hit Songs: Allows users to enjoy music videos using iframes.

### Contacts

The Contacts page allows users to find and manage friends. Key features include:

- Friend Search: Enables users to find friends by name.
- Add Friend: Allows users to add friends to their contact list.
- Remove Friend: Provides an option to permanently remove friends from the contact list.
- Ajax and JSON: Utilizes these technologies for seamless friend management.

### Friends

The Friends page displays the user's list of friends. Features include:

- Friend List: Shows the list of current friends.
- Cancel Friendship: Allows users to cancel the friendship with a particular friend.
- Remove Friend: Provides an option to permanently remove friends from the contact list.
- Global Variables: Manages recommended friends and friend information using global variables.

### Mini Games

SquirrelBook includes mini-games to entertain users. The currently implemented games are:

#### Lottery

- Latest Draw Information: Fetches and displays the latest winning numbers and prize information using Ajax.
- Random Number Generation: Generates random lottery numbers using arrays.
- Number Manipulation: Eliminates duplicate numbers and arranges them in ascending order.
- Color Indication: Changes the color of the numbers based on certain conditions.
- Number Draw: Allows users to draw new numbers by clicking a button.
- Currency Formatting: Displays the prize amount with proper formatting.

#### Rock Scissor Paper

- Image Rotation: Utilizes setInterval to rotate images.
- Computer Opponent: Generates random moves for the computer opponent using Math.random().
- Outcome Calculation: Determines the outcome of the game (win, lose, or draw) and calculates the payout.
- Betting System: Multiplies the payout by the bet amount based on the game result.

#### Begging

- Image Rotation: Utilizes setInterval to rotate images.
- Income Generation: Generates random income amounts using Math.random().
- Varied Income Structure: Different locations offer different income levels.

## Project Structure

SquirrelBook follows a collaborative approach with merging of individual HTML and JS files. The working process involves:

- Individual HTML and JS Files: Each team member works on their respective HTML and JS files.
- HTML Content: HTML code is stored as a string.
- JS Functions: JS code is stored within functions.

## Acknowledgements

Thank you for using SquirrelBook. We hope you enjoy the social networking experience and have fun playing the mini-games!

Note: This README.md file provides a brief overview of the SquirrelBook project based on the provided information. It does not include detailed technical instructions or code snippets.