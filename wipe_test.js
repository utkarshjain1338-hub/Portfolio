// Actually, standard CSS sticky:
// An element with `position: sticky; top: 50px; margin-top: 0;` placed at the top of the body.
// When scrollTop is 0, its bounding client rect top is 0. 
// Is it pushed to 50px?
// No! It is only sticky when it would otherwise be scrolled OUT of the threshold.
// Because it is at 0, it is ABOVE 50px. 
// Wait, "go above 50px" means going to 49px, 48px, ... 0px!
// 0px is ABOVE 50px on the screen.
// Oh, you're right. 0px is higher up on the screen than 50px.
// Wait, if it's placed at 0px, and it cannot go above 50px, then it MUST be pushed to 50px!
// Actually, sticky behaves like `relative` until its viewport position is less than or equal to `top`.
// Wait, "less than" means < 50px. 0 is < 50px!
// So it WILL be pushed to 50px!
