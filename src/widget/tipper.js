;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		this.on(Events.mouseEnter, data, onMouseEnter);
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		removeTooltip();

		this.off(Events.namespace);
	}

	/**
	 * @method private
	 * @name onMouseEnter
	 * @description Handles mouse enter event.
	 * @param e [object] "Event data"
	 */

	function onMouseEnter(e) {
		removeTooltip();

		var data = e.data;

		data.left = e.pageX;
		data.top  = e.pageY;

		buildTooltip(data);
	}

	/**
	 * @method private
	 * @name onMouseLeave
	 * @description Handles mouse leave event.
	 * @param e [object] "Event data"
	 */

	function onMouseLeave(e) {
		var data = e.data;

		Functions.clearTimer(data.timer);

		removeTooltip();
	}

	/**
	 * @method private
	 * @name onMouseLeave
	 * @description Handles mouse move event.
	 * @param e [object] "Event data"
	 */

	function onMouseMove(e) {
		positionTooltip(e.pageX, e.pageY);
	}

	/**
	 * @method private
	 * @name buildTooltip
	 * @description Builds new tooltip instance.
	 * @param data [object] "Instance data"
	 */

	function buildTooltip(data) {
		removeTooltip();

		var html = '';

		html += '<div class="';
		html += [Classes.base, Classes[data.direction] ].join(" ");
		html += '">';
		html += '<div class="' + Classes.content + '">';
		html += data.formatter.call(data.$el, data);
		html += '<span class="' + Classes.caret + '"></span>';
		html += '</div>';
		html += '</div>';

		Instance = {
			$tipper: $(html),
			$el: data.$el
		};

		Formstone.$body.append(Instance.$tipper);

		var $content = Instance.$tipper.find( Functions.getClassName(Classes.content) ),
			$caret   = Instance.$tipper.find( Functions.getClassName(Classes.caret) ),

			offset = data.$el.offset(),
			height = data.$el.outerHeight(),
			width  = data.$el.outerWidth(),

			tooltipLeft     = 0,
			tooltipTop      = 0,
			contentLeft     = 0,
			contentTop      = 0,
			caretLeft       = false,
			caretTop        = false,

			caretHeight     = $caret.outerHeight(true),
			caretWidth      = $caret.outerWidth(true),
			contentHeight   = $content.outerHeight(true),
			contentWidth    = $content.outerWidth(true);

		// position content
		if (data.direction === "right" || data.direction === "left") {
			caretTop   = (contentHeight - caretHeight) / 2;
			contentTop = -contentHeight / 2;

			if (data.direction === "right") {
				contentLeft = data.margin;
			} else if (data.direction === "left") {
				contentLeft = -(contentWidth + data.margin);
			}
		} else {
			caretLeft = (contentWidth - caretWidth) / 2;
			contentLeft = -contentWidth / 2;

			if (data.direction === "bottom") {
				contentTop = data.margin;
			} else if (data.direction === "top") {
				contentTop = -(contentHeight + data.margin);
			}
		}

		// Modify Dom
		$content.css({
			top:  contentTop,
			left: contentLeft
		});

		$caret.css({
			top:  caretTop,
			left: caretLeft
		});

		// Position tipper
		if (data.follow) {
			data.$el.on(Events.mouseMove, data, onMouseMove);
		} else {
			if (data.match) {
				if (data.direction === "right" || data.direction === "left") {
					tooltipTop = data.top; // mouse pos

					if (data.direction === "right") {
						tooltipLeft = offset.left + width;
					} else if (data.direction === "left") {
						tooltipLeft = offset.left;
					}
				} else {
					tooltipLeft = data.left; // mouse pos

					if (data.direction === "bottom") {
						tooltipTop = offset.top + height;
					} else if (data.direction === "top") {
						tooltipTop = offset.top;
					}
				}
			} else {
				if (data.direction === "right" || data.direction === "left") {
					tooltipTop = offset.top + (height / 2);

					if (data.direction === "right") {
						tooltipLeft = offset.left + width;
					} else if (data.direction === "left") {
						tooltipLeft = offset.left;
					}
				} else {
					tooltipLeft = offset.left + (width / 2);

					if (data.direction === "bottom") {
						tooltipTop = offset.top + height;
					} else if (data.direction === "top") {
						tooltipTop = offset.top;
					}
				}
			}

			positionTooltip(tooltipLeft, tooltipTop);
		}

		data.timer = Functions.startTimer(data.timer, data.delay, function() {
			Instance.$tipper.addClass(Classes.visible);
		});

		data.$el.one(Events.mouseLeave, data, onMouseLeave);
	}

	/**
	 * @method private
	 * @name positionTooltip
	 * @description Positions active tooltip instance.
	 * @param left [int] "Left position"
	 * @param top [int] "Top position"
	 */

	function positionTooltip(left, top) {
		if (Instance) {
			Instance.$tipper.css({
				left : left,
				top  : top
			});
		}
	}

	/**
	 * @method private
	 * @name removeTooltip
	 * @description Removes active tooltip instance.
	 */

	function removeTooltip() {
		if (Instance) {
			Instance.$el.off( [Events.mouseMove, Events.mouseLeave].join(" ") );

			Instance.$tipper.remove();
			Instance = null;
		}
	}

	/**
	 * @method private
	 * @name format
	 * @description Formats tooltip text.
	 * @return [string] "Tooltip text"
	 */

	function format(data) {
		return this.data("title");
	}

	/**
	 * @plugin
	 * @name Tipper
	 * @description A jQuery plugin for simple tooltips.
	 * @type widget
	 */

	var Plugin = Formstone.Plugin("tipper", {
			widget: true,

			/**
			 * @options
			 * @param delay [int] <0> "Hover delay"
			 * @param direction [string] <'top'> "Tooltip direction"
			 * @param follow [boolean] <false> "Flag to follow mouse"
			 * @param formatter [function] <$.noop> "Text format function"
			 * @param margin [int] <15> "Tooltip margin"
			 * @param match [boolean] <false> "Flag to match mouse position"
			 */

			defaults: {
				delay        : 0,
				direction    : "top",
				follow       : false,
				formatter    : format,
				margin       : 15,
				match        : false
			},

			classes: [
				"content",
				"caret",
				"visible",
				"top",
				"bottom",
				"right",
				"left"
			],

			methods: {
				_construct    : construct,
				_destruct     : destruct
			}
		}),

		// Localize References

		Classes      = Plugin.classes,
		Events       = Plugin.events,
		Functions    = Plugin.functions,

		// Singleton

		Instance     = null;

})(jQuery, Formstone);

/*
 * @use

### Basic

Tipper will generate a tooltip based on the target element's `data-title` attribute. Tipper can be configured to open in a specific direction by setting the `direction` key at initialization:

```
$(".target").tipper({
	direction: "top"
});
```

```
<a href="#" data-title="ToolTip Text">Tooltip Target</a>
```

### Follow

Tipper can be configured to follow the user's mouse:

```
$(".target").tipper({
	follow: true
});
```

### Match

Tipper can be configured to match the user's mouse position, relative to the target:

```
$(".target").tipper({
	match: true
});
```

### Delay

A delay can be set to avoid accidental tooltips:

```
$(".target").tipper({
	delay: 500
});
```

 */