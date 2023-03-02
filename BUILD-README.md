RPN calc build
==============

Open a shell and install a new react app folder:

```
$ npx create-react-app rpn-calc-electron
```

Now cd to this new directory and install electron:

```
$ cd rpn-calc-electron
$ yarn add -D concurrently cross-env electron electron-builder electronmon wait-on
```

 Now copy the files in this directory to the projects folder we just created. Rename the "rpn-calc-sources" directory to "src".
 
 You can list the availaible scripts by:
 
```
$ npm run
```

To run a build for a Linux Appimage and Windows App EXE:

```
node_modules/.bin/electron-builder -wl
```
