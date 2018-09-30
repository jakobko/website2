/*jQuery("#flexcontainerTop").click(function () {
      jQuery(this).toggleClass("transition");
      console.log("Her er jeg");
});*/
var toggled = 0;

function portfolioBPress() {
  if (toggled == 0) {
    jQuery("#flexcontainerTop").toggleClass("transition");
    jQuery("#flexcontainerPortfolio").addClass("visible");
    toggled = 1;
  }

  console.log("Her er jeg");
}
