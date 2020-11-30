package entite;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.example.q_io.R;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
//public class Queue {
//    private int idService;
//    private String nomService;
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//        llCategorie = findViewById(R.id.ll_categorie);
//        llRecette = findViewById(R.id.ll_recette);
//        buttonCategorieListener = new ButtonCategorieListener(this, llRecette);
//        HttpCategorieTask httpCategorieTask = new HttpCategorieTask(this, llCategorie);
//        httpCategorieTask.setListener(buttonCategorieListener);
//        httpCategorieTask.execute();
//        HttpRecetteTask httpRecetteTask = new HttpRecetteTask(this, llRecette);
//        httpRecetteTask.execute();
//    }
//}
//class HttpRecetteTask extends AsyncTask<String, Nullable, String> {
//    Context context;
//    LinearLayout llRecette;
//    public HttpRecetteTask(Context context, LinearLayout llRecette) {
//        this.context = context;
//        this.llRecette = llRecette;
//    }
//    @Override
//    protected String doInBackground(String... strings) {
//        URL url = null;
//        String json = "";
//        try {
//            if (strings != null && strings.length > 0) {
//                url = new URL("https://android-lab.herokuapp.com/recette?idCategorie=" + strings[0]);
//            } else {
//                url = new URL("https://android-lab.herokuapp.com/recette");
//            }
//            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
//            BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
//            json = in.readLine();
//            urlConnection.disconnect();
//        } catch (MalformedURLException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return json;
//    }
//    @Override
//    protected void onPostExecute(String s) {
//        super.onPostExecute(s);
//        Recette[] recettes = new Gson().fromJson(s, Recette[].class);
//        if (llRecette.getChildCount() > 0) {
//            llRecette.removeAllViews();
//        }
//        for (Recette r : recettes) {
//            llRecette.addView(createSmallRecetteView(r.getImgName(), r.getTitre()));
//        }
//    }
//    private LinearLayout createSmallRecetteView(String imgUrl, String titre) {
//        LinearLayout retour = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.recetteview_layout, null);
//        //        LinearLayout retour = new LinearLayout(context);
//        //        retour.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
//        ImageView img = retour.findViewById(R.id.img_recette_view);
//        //        ImageView img = new ImageView(context);
//        //        img.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 30));
//        TextView tv = retour.findViewById(R.id.tv_recette_view);
//        //        TextView tv = new TextView(context);
//        //        tv.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 70));
//        //        retour.addView(img);
//        //        retour.addView(tv);
//        tv.setText(titre);
//        try {
//            AssetManager assetManager = context.getAssets();
//            InputStream inputStream = assetManager.open("images/" + imgUrl);
//            Drawable drawable = Drawable.createFromStream(inputStream, null);
//            img.setImageDrawable(drawable);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return retour;
//    }
//}
//
//
