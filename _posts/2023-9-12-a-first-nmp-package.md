---
layout: post
title: Awesome Release Name Generator (my first package)
---

I have never published an package to `npm` or any other such directories, but I thought it was time to learn. The project is a simple *“release”* name generator like the [haikunator​](https://www.npmjs.com/package/haikunator) but less sofisticated in it’s initial version.
<a href="https://github.com/ftnilsson/release-name-generator" title="release-name-generator​"> <i class="svg-icon github"></i> release-name-generator</a>

I have never published an package to `npm` or any other such directories, but I thought it was time to learn. The project is a simple *“release”* name generator like the [haikunator​](https://www.npmjs.com/package/haikunator) but less sofisticated in it’s initial version.

**lessons learned:** Don’t push to `npm` unless you are sure, as the package is instantly available to millions of people its hard to change your mind. `npm` has a delay until the package is actually removed even if there are no users of it yet. So I suggest testing the package locally first with both unit tests (but we all do that anyways) and using the `yarn link` (or npm command) command (from your package project) you can then link the package into a separate test project using `yarn link release-name-generator`. FYI use `yarn unlink` to remove links

I will use the release name generator package in my next project which is to create my first GitHub action.
