const horizontalSlider = ((ev) => 
{
    // Containers
    const container = document.querySelector('.container');
    const main = document.querySelector('main');
    
    // Sections
    const section1 = document.querySelector('.section1');
    const section2 = document.querySelector('.section2');
    const section3 = document.querySelector('.section3');

    // Array of sections
    const sections = 
    [
        section1,
        section2,
        section3
    ]
    
    /**
     * Window stats
    */
    const sizes =
    {
        height: window.innerHeight,
        width: window.innerWidth,
        center: window.innerWidth / 2
    }

    /**
     * Conditional variables
     */
    let horizontalScrollEnabled = false;
    let scrollDirection = null;
    let currentScrollPosition = 0;
    let currentSection = null;
    let thisSection = sections.indexOf(currentSection);
    let lastMove = 0;

    // Amounts for CSS transitions when scrolling down/right
    let scrollAmountRight =
    [
        100,
        200,
        300
    ]
    
    // Amounts for CSS transitions when scrolling up/left
    let scrollAmountLeft = 
    [
        0,
        0, 
        100
    ]
    
    // Takes an element & returns an object of that element's positions
    function _validateCenter(element) {
        const containerOptions = 
        {
            ele: element,
            top: element.getBoundingClientRect().top,
            right: element.getBoundingClientRect().right,
            left: element.getBoundingClientRect().left,
            bottom: element.getBoundingClientRect().bottom,
            center: element.getBoundingClientRect().right / 2,
        }
    
        return containerOptions;
    }

    // Variables that are used to test when the slider is centered for both directions (sliderStard) - scroll down. && (reverseSliderStart) - scroll up.
    let sliderStart = _validateCenter(sections[thisSection + 1]).left;
    let reverseSliderStart = null;
    
    // If currentSection doesn't equal null then update reverseLeft
    if (currentSection !== null)
    {
        reverseSliderStart = _validateCenter(sections[thisSection]).left;
    }

/**
 * Slider logic
*/

   // Lock slider in view port when scrolling over it
   function _lockSliderWhenInRange(ev)
   {
       // If top of screen is 20 pixels or less to top of container && user is scrolling down - lock the container in
       if (_validateCenter(container).top <= 50 && scrollDirection === 1)
       {
           container.scrollIntoView(top);
           if (_validateCenter(container).top === 0 && _elementIsInPlace() === true)
           {
               // Wait .5s before moving to next section
                setTimeout(() => 
                    {
                        horizontalScrollEnabled = true;
                    },
                        500
                    )}
        }
       // If bottom of screen is 20 pixels or less to bottom of container && user is scrolling up - lock the container in
        else if (_validateCenter(container).bottom > window.innerHeight - 20 && scrollDirection === -1)
        {
            container.scrollIntoView(top);
            if (_validateCenter(container).top === 0 && _elementIsInPlace() === true)
            {
                setTimeout(() => 
                { 
                    horizontalScrollEnabled = true; 
                }, 
                500
                );
            }
        }
    }
    
    // Checks that element is in place before switching to horizontal scroll
    const _elementIsInPlace = () =>
    {
        // returns true || false
        return _validateCenter(container).bottom === window.innerHeight;
    }

    // Centers container when container is scrolled over
    const _centerSliderInViewPort = (event) =>
    {
        // Center container in viewport if conditions are met
        switch(true)
        {
            // If the final section is centered in the view port && user is scrolling down then resume page scroll
            case _validateCenter(sections[2]).left <= 0 && scrollDirection === 1:
                    horizontalScrollEnabled = false;
                    break;
            // If the first section is centered in the view port and user is scrolling up then resume page scroll
            case _validateCenter(sections[0]).left <= 0 && scrollDirection === -1 && thisSection === 0:
                        horizontalScrollEnabled = false;
                break;
            // If neither of the two situations above are true, resume horizontal scroll
            case scrollDirection === -1 && _validateCenter(container).bottom > window.innerHeight - 20:
                _lockSliderWhenInRange(event);
                break;
            // Resume horizontal scroll
            default:
                 _lockSliderWhenInRange(event);
        }
    }

    // Starts horizontal scroll sequence
    function scrollHorizontally(ev)
    {
        // Fetch mouse wheel direction on scroll
        _captureScrollDirection();

        // Center container on move
        _centerSliderInViewPort();
        // If horizontal scrolling is enabled then proceed to animate slides
        if (horizontalScrollEnabled === true)
        {
            // Prepares module to handle scroll direction
            _handleScrollDirection();
        }
    }

    

    // Returns the direction the wheel is spinning
    function _captureScrollDirection() 
    {
        
            window.addEventListener('wheel', (ev) =>
            {
                // Update scroll direction
                scrollDirection = Math.sign(ev.deltaY);
            })
    }

    // Calls relevant scroll function
    function _handleScrollDirection () 
    {
       scrollDirection === 1
        ? _wheelDown()
        : _wheelUp()
    }

    // Scroll left or up based on conditions
    function _wheelUp()
    {
        switch(true)
        {
            case currentSection === null:
                currentSection = sections[0]; 
                thisSection = 0;
                break;
            case currentSection != sections[0]:

                // 0.8s time buffer before scrolling left again
                if (Date.now() - lastMove > 800)
                {
                    _scrollLeft();
                    lastMove = Date.now();
                }

                break;
            case currentSection === sections[0]:
                break;
                
        }
    }

    // Scroll right or down based on conditions
    function _wheelDown()
    {
        switch(true)
        {
            case currentSection === null:
                currentSection = sections[0];
                thisSection = 0;
                break;
            case currentSection != sections[2]:

                // 0.8s time buffer before scrolling right again
                if (Date.now() - lastMove > 800)
                {
                    _scrollRight();
                    lastMove = Date.now();
                }

                break;
            case currentSection === sections[2]:
                break;
                
        }
    }

    function _scrollRight()
    {
        switch(true)
        {
            // If not on the last slide, translate all slides left
            case currentSection != sections[2]:
                section1.style.cssText = `transform: translateX(-${scrollAmountRight[thisSection]}%); transition: transform 0.4s ease-in-out;`
                section2.style.cssText = `transform: translateX(-${scrollAmountRight[thisSection]}%); transition: transform 0.4s ease-in-out;`
                section3.style.cssText = `transform: translateX(-${scrollAmountRight[thisSection]}%); transition: transform 0.4s ease-in-out;`
                
                // If conditions are met, currentSection & thisSection will be updated
                _updateCurrentSection('right');
                break;
        }

    }

    function _scrollLeft() 
    {
        switch(true)
        {
            // If not on the first slide, translate all slides right
            case currentSection != sections[0]:
                section1.style.cssText = `transform: translateX(-${scrollAmountLeft[thisSection]}%); transition: transform 0.4s ease-in-out;`
                section2.style.cssText = `transform: translateX(-${scrollAmountLeft[thisSection]}%); transition: transform 0.4s ease-in-out;`
                section3.style.cssText = `transform: translateX(-${scrollAmountLeft[thisSection]}%); transition: transform 0.4s ease-in-out;`

                // If conditions are met, currentSection & thisSection will be updated
                _updateCurrentSection('left');
                break;
        }

    }

    function _updateCurrentSection(direction)
    {
        // If element is center, then update currentSection & thisSection
        if (direction === 'right' && sliderStart <= 0)
        {
            // If slid less than .5s ago (the time required for the animation), do not update
            thisSection += 1;
            currentSection = sections[thisSection];
        }
        else if (direction === 'left' && reverseSliderStart <= 0 )
        {
            thisSection -= 1
            currentSection = sections[thisSection];
        }
    }

    return {
        scrollHorizontally,
    }
})();

export default horizontalSlider;