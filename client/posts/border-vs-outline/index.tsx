import React from 'react';

import Markdown from '../../components/Markdown';

export default () => {
    return (
<>
<Markdown
    content={`
## Differences

1. Outlines don't take the space meaning that using outlines or not doesn't affect the dimension of element.

2. \`border\` supports rounded corners with the \`border-radius\` property. Meanwhile \`outline\` doesn't.

3. We can define the border style for each side via the \`border-top\`, \`border-left\`, \`border-bottom\` and \`border-right\` properties. 
It's not possible to set the style for particular side with \`outline\`.

4. The outlines may be non-rectangular.

    In the sample code below, the outlines are shown in a non-rectangular shape:

    ~~~ html
    <div>
        ...
        <span style="outline: 0.25rem solid blue">
            ...
        </span>
        ...
    </div>
    ~~~
`} />
    <div className='w-64'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
        magna aliqua. Ut enim ad minim veniam,
        <span style={{ outline: '0.25rem solid blue' }}>
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non
        </span>
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
<Markdown
    content={`
## Good practice

The primary purpose of \`outline\` is to support accessibility. It provides visual feedback for links, buttons when users 
navigate between them with the _Tab_ key.

You shouldn't remove outline style from elements when they are being focused. Setting \`outline: none\` or \`outline: 0\` 
will make the page inaccessible for the people who don't use mouse or have a visual impairment.

One of the first and popular CSS reset library [removed](https://meyerweb.com/eric/tools/css/reset/reset200802.css) the outline,
but the author leaves a comment that reminds us to define the focus styles: 

~~~ css
/* remember to define focus styles! */
:focus {
    outline: 0;
}
~~~
    
But this reset was removed in the [latest version](https://meyerweb.com/eric/tools/css/reset/reset.css).

If you have to remove the outline style, then it's recommended to provide alternative styles.
Here are some pure CSS based solutions:

* Set the background color

    ~~~ css
    a:focus {
        background: ...;
    }
    ~~~

* Set the text color:

    ~~~ css
    a:focus {
        color: ...;
    }
    ~~~

* Using both approaches 

    ~~~ css
    a:focus {
        background: ...;
        color: ...;
    }
    ~~~

* Use a different style to normalize the look and feel of outline across browsers such as 

    ~~~ css
    a:focus {
        outline: thin dotted;
    }
    ~~~

There's another approach which uses JavaScript to handle the events. If we detect there is a mouse event, then remove the outline style. 
In the other case, if a keyboard event is detected then we restore the outline style.

Here is a piece of code demonstrating this idea:

~~~ javascript
// Append a custom style to \`head\`
const style = document.createElement('style');
document.head.appendChild(style);

const remove = () => style.innerHTML = ':focus { outline: 0 }';
const restore = () => style.innerHTML = '';

// Remove the outline initially
remove();

document.addEventListener('mousedown', () => restore());
document.addEventListener('keydown', () => remove());
~~~

Some other websites such as [Github](https://github.com) use a similar approach. Starting with a CSS class that resets the outline property:

~~~ css
.intent-mouse a:focus {
    outline: 0;
}
~~~

Initially, the CSS class is added to the body element:

~~~ html
<body class="intent-mouse">
    ...
</body>
~~~

By detecting the keyboard and mouse events, we can remove the class or add it back to the body element:

~~~ javascript
document.addEventListener('mousedown', () => {
    document.body.classList.add('intent-mouse')
});

document.addEventListener('keydown', (e) => {
    // If users press the Tab key
    // then we assume that they intent to use the keyboard to navigate
    if (e.key === 'Tab') {
        document.body.classList.remove('intent-mouse');
    }
});
~~~

## Tip

The \`outline\` property is useful when you want to visualize elements on the page.
In the following sample code, we [iterate](https://htmldom.dev/loop-over-a-nodelist) over all the elements and 
[set](https://htmldom.dev/set-css-style-for-an-element) the \`outline\` property with a [random hex color](https://1loc.dev/#generate-a-random-hex-color):

~~~ javascript
[].forEach.call(
    document.querySelectorAll('*'),
    ele => {
        const color = \`#\${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}\`;
        ele.style.outline = \`1px solid \${color}\`;
    }
);
~~~

Of course, you will need an opposite command to [reset](https://htmldom.dev/set-css-style-for-an-element) the \`outline\` property:

~~~ javascript
[].forEach.call(
    document.querySelectorAll('*'),
    ele => ele.style.removeProperty('outline')
);
~~~

You can change the selector from \`*\` to whatever you want to match the set of particular elements, for example:

~~~ javascript
// Set the outline for links only
[].forEach.call(
    document.querySelectorAll('a'),
    ...
);
~~~ 
`}
/>
</>
    );
};
