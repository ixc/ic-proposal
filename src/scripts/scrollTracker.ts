// tracks the scroll & page location in the site index in the side component

interface TrackerItem {
    intersecting: boolean;
    active: boolean;
}

interface Tracker {
    [key: string]: TrackerItem;
}

let lastScrollPosition = window.scrollY;

function handleIntersection(entries: IntersectionObserverEntry[]) {
    // find scroll direction
    const currentScrollPosition = window.scrollY;
    let scrollDirection
    // Compare current and previous scroll positions
    if (currentScrollPosition > lastScrollPosition) {
        scrollDirection = 'down';
    } else if (currentScrollPosition < lastScrollPosition) {
        scrollDirection = 'up';
    }
    lastScrollPosition = currentScrollPosition;

    // find intersecting headers
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            tracker[entry.target.id].intersecting = true;
        } else {
            tracker[entry.target.id].intersecting = false;
        }
    })

    // get the intersecting header ids
    const intersecting: string[] = orderedIDs.filter(item => tracker[item].intersecting)

    // 
    if (intersecting.length == 1){
        // if only one intersecting then set that as active
        orderedIDs.forEach(item => {
            if (item == intersecting[0]){
                tracker[item].active=true
            } else {
                tracker[item].active=false
            }
        })
    } else if ( intersecting.length > 1 ){
        let setActive=false;
        orderedIDs.forEach(item => {
            if (tracker[item].intersecting && !setActive){
                tracker[item].active=true
                setActive=true
            } else {
                tracker[item].active=false
            }
        })
    } else {
        if ( scrollDirection === 'up' ){
            // if no intersects and scrolling up then find the active id and switch it to the one above
            let activateNext=false;
            orderedIDs.reverse().forEach(item => {
                if (tracker[item].active){
                    tracker[item].active=false
                    activateNext=true
                } else if (activateNext) {
                    tracker[item].active=true
                    activateNext=false
                } else {
                    tracker[item].active=false
                }
            })
        }
    }

    // assign or remove the arrow from the aside
    orderedIDs.forEach(item => {
        const asideArrow = document.getElementById(`aside-arrow-${mainHeader}-${item}`)
        if ( asideArrow ){
            if (tracker[item].active){
                asideArrow.innerHTML = ">";
            } else {
                asideArrow.innerHTML = "";
            }
        }
    })
}

// Get elements to track (replace with your selector)
var elementsToTrack: HTMLHeadingElement[] = Array.from(document.querySelectorAll('h3')).filter(ele => ele.id);
// get the main header id. There should be only one h2 on the page
const mainHeader: string | null = document.querySelector('h2')?.id ?? null;
// order of headings
const orderedIDs: string[] = Array.from(elementsToTrack).map(ele => ele.id);
            
const tracker: Tracker = orderedIDs.reduce((acc: Tracker, ele: string) => {
    acc[ele] = { intersecting: false, active: false };
    return acc;
}, {});
            
// Now IntersectionObserver is available, proceed with your code
const observer = new IntersectionObserver(handleIntersection);

// Observe each element
elementsToTrack.forEach(element => {
    observer.observe(element);
});