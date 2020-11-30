package service;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
public class ConnectionDb {
    private static int version = 2;
    private static String nom = "queueio.db";
    public static SQLiteDatabase getBd(Context context) {
        return null;
    }
    Postgresqlcon postgresqlcon = new Postgresqlcon();
//    postgresqlcon.execute();
}
