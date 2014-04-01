/*jslint browser: true, indent: 4 */
/*global chrome */

"use strict";

Array.prototype.forEach.call(document.querySelectorAll("*[data-i18n]"), function (el) {
    var m = chrome.i18n.getMessage(el.dataset.i18n);
    if (m) {
        el.textContent = m;
    }
});

var enabled    = document.getElementById("enabled"),
    autoplay   = document.getElementById("autoplay"),
    visibility = document.getElementById("visibility"),
    embiggen   = document.getElementById("embiggen"),
    audio      = document.getElementById("audio"),
    space      = document.getElementById("space"),
    retry      = document.getElementById("retry"),
    codec      = document.getElementById("codec"),
    rate       = document.getElementById("rate");

codec.selectedIndex = -1;

rate.selectedIndex = -1;

enabled.addEventListener("change", function () {
    chrome.storage.local.set({"enabled": this.checked});
});

autoplay.addEventListener("change", function () {
    chrome.storage.local.set({"autoplay": this.checked});
});

visibility.addEventListener("change", function () {
    chrome.storage.local.set({"visibility": this.checked});
});

embiggen.addEventListener("change", function () {
    chrome.storage.local.set({"embiggen": this.checked});
});

audio.addEventListener("change", function () {
    chrome.storage.local.set({"audio": this.checked});
});

space.addEventListener("change", function () {
    chrome.storage.local.set({"space": this.checked});
});

retry.addEventListener("change", function () {
    chrome.storage.local.set({"retry": this.checked});
});

codec.addEventListener("change", function () {
    chrome.storage.local.set({"codec": this.value});
});

rate.addEventListener("change", function () {
    chrome.storage.local.set({"rate": this.value});
});

chrome.storage.local.get(null, function (options) {
    // delete old (<0.5) options
    if (options.decode) {
        chrome.storage.local.remove("decode");
    }
    if (options.script) {
        chrome.storage.local.remove("script");
    }
    if (options.format) {
        chrome.storage.local.remove("format");
    }
    if (options.prioritise) {
        chrome.storage.local.remove("prioritise");
    }
    // init options
    if (typeof options.enabled === "boolean") {
        enabled.checked = options.enabled;
    }
    if (typeof options.autoplay === "boolean") {
        autoplay.checked = options.autoplay;
    }
    if (typeof options.visibility === "boolean") {
        visibility.checked = options.visibility;
    }
    if (typeof options.embiggen === "boolean") {
        embiggen.checked = options.embiggen;
    }
    if (typeof options.audio === "boolean") {
        audio.checked = options.audio;
    }
    if (typeof options.space === "boolean") {
        space.checked = options.space;
    }
    if (typeof options.retry === "boolean") {
        retry.checked = options.retry;
    }
    if (typeof options.codec === "string") {
        Array.prototype.some.call(codec.options, function (o) {
            if (o.value === options.codec) {
                o.selected = true;
                return true;
            }
        });
    }
    if (typeof options.rate === "string") {
        Array.prototype.some.call(rate.options, function (o) {
            if (o.value === options.rate) {
                o.selected = true;
                return true;
            }
        });
    }
});
