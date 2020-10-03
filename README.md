# selenium-cursor
Show mouse cursor in selenium tests

I needed to record videos to demo a web application. 

In the beginning I followed the classic approach: screen recording and then video editing. Even the smaller mistake forced me to retake the screen recording.

So, I decided to use Selenium IDE to record my sessions, so I can easily apply smaller changes and correction when needed, bofore taking the final recording.
Selenium IDE improved the overall efficiency of the process, but there was a problem: no mouse cursor is visible, which is confusing, because the audience cannot follow what is going to happen, until an element is actually click.

I googled a lot, without finding a satisfying way. In the end, I came with this javascript code to display and move the mouse cursor.

Credit to https://stackoverflow.com/questions/35867776/visualize-show-mouse-cursor-position-in-selenium-2-tests-for-example-phpunit for the initial idea.

# Usage

Execute the selenium-cursor.js at the beginning of your .side test, just after opening the page.

Then, when you need to move the cursor (eg: before a click or type event), use command 'execute script' to execute the javascript function to move the cursor to a specific element.

    document.cursor.moveToTarget(target, speed = 1, offsetX = 0.5, offsetY = 0.5)
    
Parameters:
* target: the HTML element you want to move cursor to
* speed: optional parameter to change the default speed
* offsetX: horizontal offset, calculated over the element's width. Left=0, center=0.5, right=1
* offsetY: vertical offset, calculated over the element's height. Top=0, center=0.5, bottom=1


The document.cursor object provides 3 additional handy methods to move the cursor, depending on the type of selector that you want to use:

### Move to ID

**id** is the id property (string type) of the HTML element
    
    document.cursor.moveToId(id, speed = 1, offsetX = 0.5, offsetY = 0.5)
    
    
    
### Move to Class
**class** is the id property (string type) of the HTML element

    document.cursor.moveToCss(class, speed = 1, offsetX = 0.5, offsetY = 0.5)

"<class>:nth-child(n)" syntax is supported and the proper child is targeted.

### Move to Name
**name** is the id property (string type) of the HTML element

    document.cursor.moveToName(name, speed = 1, offsetX = 0.5, offsetY = 0.5)
    
    if more than one element are found with the requested name, the first one is used.
