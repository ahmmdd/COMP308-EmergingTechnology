# **COMP 308 - Assignment 1 - Express Portfolio Site**

**Github Repository:** https://github.com/ahmmdd/COMP308Assignment1

**Heroku Website:** https://comp308assignment1.herokuapp.com/

## **Overview**
Create your personal Portfolio Website using **ExpressJS** and implementing the **EJS templating engine**. Your site must be hosted live on a cloud service such as **Microsoft Azure**, **Heroku**, or **Digital Ocean**.

## **Instructions**
This Express site must include the pages from your Personal Portfolio 5 pages - your **Home page**, an **About Me** page, a **Projects page**, a **Services page**, and a **Contact Me** page.

1. Your Portfolio site will use **ExpressJS** and **NodeJS** and your web pages have been split use different **View templates** and partials by implementing the **EJS templating engine** and express routes **(4 Marks: GUI, 4 Marks: Functionality)**:
    * Your site should include at least 2 View templates – one for your **Home Page** and one for your **Contact Me** page. **Note**: You may include additional templates as needed to accommodate other site pages (4 Marks: Functionality, 4 Marks: GUI).
    * An Express Route must exist for each page of your site. **Note**: You will need to use the **`app.get(path, callback(req, res, next))`** method structure with a **`res.render(view, locals)`** method call to render each view (4 Marks: Functionality).
2. Your site will use the new structure created by the **Express Generator**. Your site files will be migrated to work within the **public**, **routes** and **views** folders **(20 Marks: Site Structure)**:
    * Generate your site structure with the Express Generator. **Note**: You must use the **-e** option to ensure that you implement the **EJS templating engine** for Express (3 Marks: Site Structure).
    * Your **JavaScript, CSS and Multimedia Asset Files** should be moved to separate folders within the public folder. Using the Twitter Bootstrap CSS framework is strongly recommended, though not required. **Note**: the **public** folder is part of the path and does not have to be referenced (3 Marks: Site Structure).
    * You will define routes for all of your site pages in the **index.js** file in your **routes** folder (1 Mark: Site Structure).
    * Your views folder will contain your **EJS page templates**. You will create a separate folder named partials for all of your partial **EJS files**. You will need several partials including **header.ejs, content.ejs, footer.ejs** and others. (6 Marks: Site Structure).
    * All Your Code (HTML, CSS, JavaScript, jQuery, etc.) is error free (1 Mark: Site Structure).
    * Your site uses appropriate **JavaScript** libraries that function through the use of links to a various **CDNs** (Content Delivery Networks) (1 Mark: Site Structure).
    * The latest version of your site will be hosted live and error free on a Cloud Hosting Service (5 Marks: Site Structure).
3. Include **Internal Documentation** for your site **(4 Marks: Internal Documentation)**:
    * Ensure you include a **comment header** for your **HTML, CSS and JavaScript files** that indicate: the **File name, Author's name, web site name,** and **file description** (2 Marks: Internal Documentation).
    * Ensure you include a **section headers** for all of your **HTML structure, CSS style sections,** and any **JavaScript functions** (1 Marks: Internal Documentation)
    * Ensure all your code uses contextual variable names that help make the files humanreadable (1 Marks: Internal Documentation).
    * Ensure you include inline comments that describe your GUI Design and Functionality. **Note**: Please avoid “over-commenting” (1 Marks: Internal Documentation)
4. Share your files on **GitHub** to demonstrate Version Control Best Practices and push your site to a cloud host **(4 Marks: Version Control, 4 Marks: Cloud Hosting).**
    * Your repository must include **your code** and be well structured (2 Marks: Version Control).
    * Your repository must include commits that demonstrate the project being updated at different stages of development – each time a major change is implemented (2 Marks: Version Control).
    * You must deploy your site to your Cloud Server using **git** (4 Marks: Cloud Hosting).

## **Optional Site Features (i.e. Potential Bonus Marks).**
1. Use the **AngularJS** front-end framework to improve interactivity and to implement the MVC design pattern (4 Bonus Marks).
2. Create a working **contact form** on the Contact Me page using **node.js** and appropriate node packages (4 Bonus Marks).
3. Create an external document (MS Word or PDF) that includes page wireframes, an explanation of the technologies used, and a Style Guide that details visual elements such as fonts and colours (4 Bonus Marks).