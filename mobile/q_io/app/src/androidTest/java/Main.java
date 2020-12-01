import android.app.Activity;

import java.util.List;
public class Main {
    List<Activity> activities;
    public void start() {
        MainActivityMy m = new MainActivityMy();
        m.start();
    }
}
class ActivityMy {
    public void onCreate() {
    }
    public void onStart() {
    }
    public void onResume() {
    }
    public void onPause() {
    }
    public void onStop() {
    }
    public void onDestroy() {
    }
    public void start() {
        onCreate();
        onStart();
        onResume();
    }
    public void stop() {
        onPause();
        onPause();
        onDestroy();
    }
}
class MainActivityMy extends ActivityMy {
    @Override
    public void onStart() {
        super.onStart();
    }
    @Override
    public void onCreate() {
        super.onCreate();
    }
}
