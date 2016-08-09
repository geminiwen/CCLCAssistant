var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
    include: "https://www.cclc.co/debt/*",
    contentScriptFile: [
        self.data.url("jquery-2.1.4.min.js"), self.data.url("moment.min.js"), self.data.url("index.js")
    ],
    contentStyleFile: [
        self.data.url("list.css")
    ]
});