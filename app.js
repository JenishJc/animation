gsap.registerPlugin(ScrollTrigger);

const slider = document.querySelector("#slider");
const first = document.querySelector("#first");
const firstText = first.innerHTML; 

const clonedFirstText = document.createElement('span');
clonedFirstText.innerHTML = firstText;
first.appendChild(clonedFirstText);

let xPercent = 0;
const speed = 0.04;

const animateText = () => {
  xPercent -= speed;

  if (xPercent <= -100) {
    xPercent = 0;
  }

  gsap.set(first, { xPercent });
  gsap.set(clonedFirstText, { xPercent: xPercent + 100 });

  requestAnimationFrame(animateText);
};

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(animateText);

  gsap.to("#slider", {
    scrollTrigger: {
      trigger: "#slider",
      start: "top bottom",
      end: "bottom top",  
      scrub: true    
    },
    x: "-=100px"     
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const blockRows = document.querySelectorAll('.blocks-row');
  blockRows.forEach((row) => {
  for (let i = 0; i < 8; i++ ){
    const block = document.createElement("div");
    block.className = "block";
    row.appendChild(block); 
  }
 });
 const blockContainers = document.querySelectorAll(".blocks-container");
 blockContainers.forEach((container) => {
    const rows = container.querySelectorAll(".blocks-row");
    const numRows = rows.length;

    rows.forEach((row, rowIndex) => {
        let blocks = Array.from(row.querySelectorAll(".block"));
        let isTop = container.classList.contains("top");

        let randomizedOrder = gsap.utils.shuffle(blocks.map((block, idx) => idx ));
        ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",  
            scrub: true,
            onUpdate: (self) => {
                let progress = self.progress; 
                let rowDelay = 0.3 * (numRows - rowIndex -1);
                let adjustedProgress = Math.max(0, Math.min(1, progress - rowDelay));

                updateBlockOpacity(blocks, randomizedOrder, isTop, adjustedProgress)
            } ,
        })
    })

 });

 function updateBlockOpacity(blocks, order, isTop, progress){
    blocks.forEach((block, idx) => {
        let offset = order.indexOf(idx) / blocks.length;
        let adjustedProgress = (progress - offset) * blocks.length;
        let opacity = isTop ? 
        1 - Math.min(1, Math.max(0, adjustedProgress))
        : Math.min(1, Math.max(0, adjustedProgress)); 

        block.style.opacity = opacity;
    })
 }
});

