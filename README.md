# Slim Slides

A tiny CSS and JavaScript based slides framework for developing slides using
HTML. The slides are displayed properly even without the JavaScript and, when
coded correcly, should also appear useful without CSS support.

## Getting started

Create a basic HTML file and include the JavaScript and CSS from this module in
whatever way you fancy. You may simply copy the file to you project for
simplicity, or (if you feel slightly more adventurous) link directly to this
GitHub repo for future updates without any guarantees:
```html
<link rel="stylesheet" href="https://trulfos.github.io/slim-slides/index.css">
<script src="https://trulfos.github.io/slim-slides/index.js"></script>
```

Next, add the `slideshow` and `fullscreenable` to your body, and start adding
slides as child elements of the body. Here's a short example:
```html
<body class="slideshow fullscreenable">
    <header id="title">
        <h1>My presentation</h1>
        <p>An example of a Slim Slides presentation</p>
    </header>

    <h2 id="introduction">Introduction</h2>

    <section id="introduction-first">
        <h3>First part of introduction</h3>
        <p>Some example text</p>
    </section>

    <section id="introduction-second">
        <h3>Second part of introduction</h3>
        <ul>
            <li>This time</li>
            <li>in a</li>
            <li>bullet list.</li>
        </ul>
    </section>

    <h2 id="final-part">Final part</h2>

    <section id="final-part-slide1">
        <h3>With a final silde</h3>
        <p>And some final words. Thanks.</p>
    </section>
</body>
```

Note that each slide has an `id` attribute. This can be used for linking to
specific parts of the presentation (`my-presentation.html#final-part`) and is
used to update the location in the browser and allows remembering the position
when exiting/entering full screen mode.

A full example can be found in the `example.html` file.

## Adding styles

As you may have observed, the default styles are boring and may even appear
with weired white spacing given some types of elements. Don't hesitate to add
your own styling. Here are some examples.

Inverted first slide:
```css
header {
    color: white;
    background: black;
}
```

Background image on subtitle slides:
```css
h2 {
    background: url(my-image.jpg);
}
```

Logo on all slides:
```css
.slideshow > *::after {
    content: '';
    background-image: url('images/archive.jpg');
    background-size: contain;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 10vh;
    width: 30vw;
}
```
