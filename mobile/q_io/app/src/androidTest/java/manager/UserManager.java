package manager;
import android.content.Context;

import com.google.gson.Gson;

import java.util.ArrayList;

import entite.User;
public class UserManager {
    private static String queryGetAll = "SELECT * from USER";
    //    https://chartio.com/resources/tutorials/how-to-get-all-keys-in-redis/
//    redis 127.0.0.1:6379> keys *
//    redis-cli dbsize
    public static void getAll(Context context, int idRole) {
        ArrayList<User> retour = new ArrayList<>();
        Gson gson = new Gson();
        String jsonQueue = gson.toJson(retour);
        User fromJsonQueue = gson.fromJson(jsonQueue, User.class);
    }
}
