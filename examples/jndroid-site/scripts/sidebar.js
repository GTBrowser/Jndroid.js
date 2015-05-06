/**
 * Created by lency on 5/5/15.
 */
function SideBar()
{
    ViewGroup.apply(this, []);

    this.setBackgroundColor(0xFFFFFFFF);

    var animationShow = new TranslateAnimation(0,200,0,0);
    animationShow.setInterpolator(Interpolator.EASE_IN_OUT);
    animationShow.setDuration(300);

    var animationHide = new TranslateAnimation(0,-200,0,0);
    animationHide.setInterpolator(Interpolator.EASE_IN_OUT);
    animationHide.setDuration(300);


    this.show = function(){
        this.setAnimation(animationShow);
        animationShow.start();
    };

    this.hide = function(){
        this.setAnimation(animationHide);
        animationHide.start();
    };

}