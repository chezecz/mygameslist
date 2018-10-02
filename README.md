# Mygameslist

This project is a web application for switch gamers. It allows them to track games and record current progress.

## How to run the application

### Angular installation

`npm install -g @angular/cli`

### Production server

`npm start`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Project status

Currently application is in early prototype version.

### Implemented pages

#### Main Screen

Currently empty

#### User Profile

Includes user bio and game list

#### Game Info

Includes infoprmation about selected game

## To Do

    ~~1. Connect application and SQLite database~~
    2. Set up CSS styles
    3. Greate game lists
    4. Review code accoring to coding agreement
    
## Style Agreement

    1. Variables shoud be named in snake_case
    2. All comments should be written in English only
    3. It is not allowed to comment parts of the code
    4. Code should be separated into files of reasonable length
    5. Line length is limited with 80 characters
    6. Tabulations ('\t') are used for making correct spacing
    7. Variable name should be meaningful but no,longer than 20 characteres
    8. Traditional variables ('i', 'k' for iterators, 'a', 'b', 'sqrt' for math calculations) are considered as meaningful
    9. Binary operators should have adjacent single spacing ("b = a + 1" or "root == solution")
    10. Uniry operators should not be separeted with any spacings
    11. It is not allowed to use any constants in code. All constants should be assigned to variables
    12. Console log could be used for debugging
    13. If the same code will be used twice, it should be separated into reusable function
    14. Any significant changes of application should be divided into separate branch
    15. All the changes in code, file structure should be documented as soon as possible
    
    
    
### Current Folder Structure

```
.
├── angular.json
├── backend
│   ├── README_for_testserver.md
│   ├── gamesdatabase.db
│   ├── index.js
│   ├── mygameslist.sql
│   ├── package-lock.json
│   └── package.json
├── database
│   ├── gamesdatabase.db
│   └── mygameslist.sql
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── app-routing.module.spec.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── dashboard
│   │   │   ├── dashboard.component.css
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.spec.ts
│   │   │   └── dashboard.component.ts
│   │   ├── description
│   │   │   ├── description.component.css
│   │   │   ├── description.component.html
│   │   │   ├── description.component.spec.ts
│   │   │   └── description.component.ts
│   │   ├── service
│   │   │   ├── game.service.spec.ts
│   │   │   ├── game.service.ts
│   │   │   ├── list.service.spec.ts
│   │   │   ├── list.service.ts
│   │   │   ├── universal.service.spec.ts
│   │   │   ├── universal.service.ts
│   │   │   ├── user.service.spec.ts
│   │   │   └── user.service.ts
│   │   ├── universal.service.spec.ts
│   │   ├── universal.service.ts
│   │   └── user
│   │       ├── user.component.css
│   │       ├── user.component.html
│   │       ├── user.component.spec.ts
│   │       └── user.component.ts
│   ├── assets
│   ├── browserslist
│   ├── classes
│   │   ├── game.ts
│   │   ├── list.ts
│   │   └── user.ts
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   └── styles.cs
└── README.md


```
