const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
const componentPath = path.join(__dirname, './ui/App.js');

// const componentPath = path.join(__dirname, './bills/BillsList.js');

// const componentPath = path.join(__dirname, './auth/login.js');

const renderer = new ReactDocGenMarkdownRenderer({
    componentsBasePath: __dirname
});

// componentsBasePath: path.join(__dirname, './newsfeed/Newsfeed.js')

fs.readFile(componentPath, (error, content) => {
        const documentationPath = path.basename(componentPath, path.extname(componentPath)) + renderer.extension;

        console.log("documentationPath:",documentationPath);

        console.log("content:", content);
        const doc = reactDocgen.parse(content);
        fs.writeFile(documentationPath, renderer.render(
            /* The path to the component, used for linking to the file. */
            componentPath,
            /* The actual react-docgen AST */
            doc,
            /* Array of component ASTs that this component composes*/
            []));


        if (error){
            console.log("Error: ",error);
        }
        if(content){
            console.log("Content:",content);
        }

        console.log("documentationPath:",documentationPath);
    }
);
