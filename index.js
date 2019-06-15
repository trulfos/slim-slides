// Bootstrap components
window.addEventListener('load', event => {
    mountComponents(document, [Slideshow, Fullscreenable]);
});

/**
 * Allows a component to set to fullscreen.
 */
class Fullscreenable {
    constructor(node) {
        this.node = node;

        document.addEventListener('keyup', this.handleKeyEvent.bind(this));

        const fullscreenHandler = this.syncFullscreenClass.bind(this);
        document.addEventListener('webkitfullscreenchange', fullscreenHandler);
        document.addEventListener('fullscreenchange', fullscreenHandler);
    }

    syncFullscreenClass(event) {
        if (isFullscreen()) {
            // We are using a class because :fullscreen is buggy in chrome
            this.node.classList.add('fullscreen');
		} else {
            this.node.classList.remove('fullscreen');
		}
    }

    handleKeyEvent(event) {
        if (event.key === 'f') {
            this.toggleFullscreen();
        }
    }

    toggleFullscreen() {
        this.enterFullscreen();
    }

    enterFullscreen() {
        const {node} = this;
        (node.requestFullscreen || node.webkitRequestFullscreen).call(node);
    }
}
Fullscreenable.selector = '.fullscreenable';

/**
 * Slideshows consists of partials with next and prev links.
 */
class Slideshow {
    constructor(node) {
        this.node = node;
        this.currentSlide = 0;

        node.classList.add('with-javascript');
        node.addEventListener('keyup', this.handleKeyEvent.bind(this));
        node.addEventListener('wheel', this.handleWheelEvent.bind(this));

		this.getInitialSlide().classList.add('visible');
    }

	getInitialSlide() {
        const {children} = this.node;
        const hash = window.location.hash;

		if (!hash) {
			return children[0];
		}

        const hashChild = find(
			children,
			child => child.id === hash.substring(1)
		);

		return hashChild || children[0];
	}

    checkSlides() {
        if (this.node.children.length === 0) {
            throw new Error('No slides in slideshow :(');
		}
    }

    handleKeyEvent(event) {
        switch (event.key) {
            case ' ':
            case 'ArrowRight':
                return this.next();
            case 'Backspace':
            case 'ArrowLeft':
                return this.previous();
        }
    }

    handleWheelEvent(event) {
        if (document.fullscreenElement !== this.node) {
            return;
        }

        if (event.deltaY > 0) {
            this.next();
        } else {
            this.previous();
        }
    }

    findVisible() {
        const {children} = this.node;

        return find(
            children,
            child => child.classList.contains('visible')
        ) || children[0];
    }

    next() {
        return this.moveToRelative(
            current => current.nextElementSibling
        );
    }

    previous() {
        return this.moveToRelative(
            current => current.previousElementSibling
        );
    }

    moveToRelative(findRelative) {
        const current = this.findVisible();
        const next = findRelative(current);

        if (next) {
            current.classList.remove('visible');
            next.classList.add('visible');

            window.location.hash = next.id || '';
        }
    }

	getSlideElements() {
		return this.node.childern
	}
}
Slideshow.selector = '.slideshow';

function find(array, predicate) {
	return Array.prototype.find.call(array, predicate);
}

function isFullscreen() {
    return document.fullscreen || document.webkitIsFullScreen;
}

function mountComponent(node, Component) {
    const nodes = node.querySelectorAll(Component.selector);

    Array.prototype.forEach.call(nodes, n => {
        new Component(n);
    });
}

function mountComponents(node, components) {
    components.forEach(mountComponent.bind(null, node));
}
