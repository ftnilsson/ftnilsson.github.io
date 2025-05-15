---
layout: post
title: The superstruct Manifesto - What I take away from this book by David Guttman  
---

The book has some really good take-aways, with a fresh and honest perspective on certain aspects of the tech-industry. I might not *totally* agree with the solution to all of the 10 points in the book, and, I do think some will be difficult to implement in a larger enterprise environment (where most of us work), but none the less, it is a very good read. So much so that I have used the books theroy as a basis to write a manifesto for a team that I presently lead.

The book is not a manual, but each chapter tackles and dismantles a common tech-industry ritual with a common sense approach.

## Lets look at the 10 bullets from the book

### 1. We Will Not Inflict Daily Standups on Our Devs

I *totally* agree that Daily Stand Ups *do not* produce much value in what they report. Especially when they are set up following the Scrum manual of "yesterday I... , Today I will... and this blocks me". However, I do think a short meeting is important for the team to have being that many of us now work remotely (or at least in a hybrid). But rather than using scrum, report on what you aim to finish today.

### 2. We Will Not Test Devs with Computer Science Riddles

What does it prove that a developer can solve a computer riddle by using a recursion with C# 13 specific symatics, if you are hiring for a team that develops UWP apps? (Note, not available in C#13 ;) ). Test the applicant on stuff that they will actually be working with. Or why not invite developers from the team, let them pair-program with the applicant, and see how this person is to work with. That is much more valuable!

### 3. We Will Not Recruit 10x Developers

I had never heard the term 10x developers before this book. However I have worked with some extremely talented developers who might be 10x times more productive. Unfortunately they generally do not make great team members as they are usually doing their own thing. I would rather have a bunch of "normal" devlopers who all believe in what we are trying to achieve, and want to do it together. 

Also by the reasoning that they are 10x better than others would indicate that they are 10x more costly. Having 10 developers who can work on things in parallel, is usually more productive in the end. 

### 4. We Will Not Let Devs Start without an Estimate

This is a really good idea, as it forces the devlopers to think about the task, it also gives a sence of ownership. As a manager you can use these estimates to follow up on progress. Just make sure that the estimates are not seen as deadlines.

### 5. We Will Not Sprint

I have nothing against Sprints (or Scrum) per say, however Scrum comes with a lot of rituals that usually do not give that much value, IMO. Sprints very rarely work if you are not lucky enough to work in a company/project where business lets the team work for the whole sprint without chasing them, changing requirments, or bombarding them with support questions. Kanban is easier to maintain, *and* it makes it easier to limit work in progress, and visualise that. - "Yes you can have this feature right away, BUT, that means I have to stop what I am working on right now". - Also, throughout my career, I have seen several different "methodoligies" on how to develop software, and agile is how we, the technologist, would like to work. I have yet to see a business that are embrasing agile! (or even understands it)

### 6. We Will Not Allow Our Devs to Multitask

This is also a really good point, if you read a previous post I wrote on,  [deep work](https://www.senordeveloper.net/Deep-Work/), which I am very passionate about, multitasking is not conducive to focused work, and hence will not yield value. 

Once again using Kanban could help, as you can set "Work In Progress", WIP, limits.

### 7. We Will Not Accept the First Solution a Dev Thinks Up

Always make developers present more than one solution. This will result in better decision making, and a solution that fits right now. It is *so* easy to over engineer solutions, but by presenting different solutions, it is easier to reason the merits of one that fits, without creating technical debt and casuing problems further down the line.

### 8. We Will Not Allow Our Devs to Talk in Private

Another super important point, and one that is actually quite easy to implement. If for example you use Slack/Teams, always move descussions to a public channel so everybody know what is going on, what decisions have been taken, and why. Developers are not known for their love of documentation but building this in to the daily routine gives a lot of benefits. For example, easier onboarding, noone needs to search in obscure places for information and everybody feels onboard as decisions are taken in public. Architectual Decicion Records, ADR, is a quick way for devs to document, this usually creates a smaller hurdle to adopt. But also, using common places for schemas etc is also really helpful. Next time you start writing a DM, *think again* and send that message in a public channel.

[ADR info](https://adr.github.io/)

[ADR Repo with templates](https://github.com/joelparkerhenderson/architecture-decision-record)

### 9. We Will Not Allow Our Devs to Wander Off

If developers are left to wander off, they will soon loose focus and start looking for the next cool project. Remedies for this one are tricky. One solution is to make sure the company spends time listening to its developers, and making sure that they hire people who buy in to the mission.

### 10.  We Will Not Let Our Devs Boss Us Around

Whether you are a multinational company, a start-up founder, or an entrepeneure, it is important that you *do not* let your developers dictate how things should be done. No company should be held hostage by its dev team! For example, "We must use this new cool framework", if it will delay a go-to market. Hopefully, this will not happen if you have hired the right team and that they have a buy-in to the product.

## Conclusion
Our task as software engineers is to create value for a business in a sustainable way. Being agile is not a recipe for sucess and *can* end up stealing valuable time!  

Author's web: [David Guttman](https://davidguttman.com/) 
