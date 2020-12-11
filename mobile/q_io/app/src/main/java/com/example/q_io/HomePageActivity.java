package com.example.q_io;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.SystemClock;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.toolbox.JsonObjectRequest;
import com.squareup.picasso.Picasso;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutionException;
import java.util.logging.Handler;
import java.util.logging.LogRecord;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import static androidx.appcompat.widget.AppCompatDrawableManager.get;
public class HomePageActivity extends AppCompatActivity implements View.OnClickListener {
    Context ctx;
    private ImageView companyLogo;
    private TextView companyName;
    private TextView chronometer;
    private TextView dateApp;
    private TextView timeApp;
    private TextView tempsText;
    private TextView tempsAttente;
    public TextView totalInQueue;
    public TextView currentNumber;
    private Button confirmBtn;
    private Button inviteBtn;
    private Button terminateServiceBtn;
    private Button deconnectionBtn;
    Chronometer chronometer_up;
    String idCommerce;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        ctx = this;
        Intent intent;
        intent = getIntent();
        idCommerce = intent.getStringExtra("idCommerceVarTemp");
        companyLogo = (ImageView) findViewById(R.id.company_logo_id);
        companyName = (TextView) findViewById(R.id.company_name_id);
        totalInQueue = (TextView) findViewById(R.id.total_queue_id);
        currentNumber = (TextView) findViewById(R.id.current_number_id);
        tempsAttente = (TextView) findViewById(R.id.temps_attente_id);
        chronometer = (TextView) findViewById(R.id.chronometer_id);
        Button confirmBtn = (Button) findViewById(R.id.confirm_btn_id);
        Button inviteBtn = (Button) findViewById(R.id.invite_btn_id);
        Button terminateServiceBtn = (Button) findViewById(R.id.terminate_btn_id);
        Button deconnectionBtn = (Button) findViewById(R.id.deconnection_btn_id);
        chronometer_up = findViewById(R.id.count_up);
        tempsText = (TextView) findViewById(R.id.temps_text_id);
        String urlLogo = "https://image.shutterstock.com/image-photo/foto-real-tomado-en-estudio-260nw-1678360027.jpg";
//        Picasso.with((this).load(urlLogo).into(companyLogo));
        ClassConnection connection = new ClassConnection();
        try {
            String response = connection.execute("https://queueio.herokuapp.com/commerce/" + idCommerce).get();
            JSONArray jsonArray = new JSONArray(response);
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            String companyNameVarTemp = jsonObject.getString("nom");
            companyName.setText(companyNameVarTemp);
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
//        connection = new ClassConnection();


//        Appel JSON
        try {
            JSONObject jsonObject = new JSONObject(JsonDataFromAsset());
            JSONArray jsonArray = jsonObject.getJSONArray("queues");
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject userData = jsonArray.getJSONObject(i);
                companyLogo.setImageResource(R.drawable.logo_rbc);
//                companyName.setText(userData.getString("commerce_id"));
//                currentNumber.setText(userData.getString("current_number"));
//                totalInQueue.setText(userData.getString("totalInQueue"));
//                password.setText(userData.getString("password"));
//                email.add(userData.getString("email"));
//                date.add(userData.getString("date"));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        //Définir la date actuelle
        Calendar calendar = Calendar.getInstance();
        String currentDate = DateFormat.getDateInstance(DateFormat.FULL).format(calendar.getTime());
        dateApp = (TextView) findViewById(R.id.date_app_id);
        dateApp.setText(currentDate);
        //Définir l'heure actuelle
        timeApp = (TextView) findViewById(R.id.time_app_id);
        String currentTime = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());
        timeApp.setText(currentTime);
        //Définir des boutons
        terminateServiceBtn.setOnClickListener(this);
        JSONObject userData = new JSONObject();
        deconnectionBtn.setOnClickListener(v -> deconnectionAlertDialog());
        tempsText.setText(" Bonne journée !");
        inviteBtn.setOnClickListener(v1 -> {
            new CountDownTimer(10000, 1000) {
                public void onTick(long millisUntilFinished) {
                    chronometer.setText(millisUntilFinished / 1000 + " sec.");
                    inviteBtn.setEnabled(false);
                    deconnectionBtn.setEnabled(false);
                    deconnectionBtn.setText("");
                    tempsText.setText("Temps d'attente du client");
                    if (confirmBtn.isPressed() == true) {
                        cancel();
                        chronometer_up.setText("");
                        chronometer_up.setBase(SystemClock.elapsedRealtime());
                        confirmBtn.setOnClickListener(view -> chronometer_up.start());
                        inviteBtn.setText("Soyons gentils avec tous les clients");
                        confirmBtn.setText("En service");
                        confirmBtn.setTextColor(Color.parseColor("#008000"));
                        inviteBtn.setTextColor(Color.parseColor("#008000"));
                        tempsText.setText("Attention ! ");
                        tempsText.setTextColor(Color.parseColor("#ff0000"));
                        chronometer.setText("Temps max. pour la visite: ");
                        chronometer.setTextColor(Color.parseColor("#636363"));
                        ClassConnection connection = new ClassConnection();
                        try {
                            String response = connection.execute("https://queueio.herokuapp.com/commerceConfigId/" + idCommerce).get();
                            JSONArray jsonArray = new JSONArray(response);
                            JSONObject jsonObject = jsonArray.getJSONObject(0);
                            String tempsAttenteVarTemp = jsonObject.getString("nb_minutes_retard");
                            tempsAttente.setText(tempsAttenteVarTemp);
                        } catch (ExecutionException e) {
                            e.printStackTrace();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        deconnectionBtn.setEnabled(false);
                        deconnectionBtn.setTextColor(Color.parseColor("#ff0000"));
                        deconnectionBtn.setText("Client servi !");
                    } else {
                        inviteBtn.setTextColor(Color.parseColor("#ff0000"));
                        inviteBtn.setText("Attendre le client ...");
                        deconnectionBtn.setEnabled(false);
                        deconnectionBtn.setText("");
                    }
                }
                public void onFinish() {
                    timeFinishedAlertDialog();
                    tempsText.setText("Temps écoulé...");
                    chronometer.setText("Passer au client suivent ?");
                    try {
                        Thread.sleep(0);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    inviteBtn.setEnabled(true);
                    inviteBtn.setText("Inviter client");
                    inviteBtn.setTextColor(Color.parseColor("#008000"));
                    deconnectionBtn.setEnabled(true);
                    deconnectionBtn.setText("Déconnection");
                }
            }.start();
            Toast.makeText(this, "Client invité", Toast.LENGTH_SHORT).show();
        });
    }
    //Call JSON LOCALE: "queues.json"
// JSON l'exemple BIEN FONCTIONNEL
    private String JsonDataFromAsset() {
        String json = null;
        try {
            InputStream inputStream = getAssets().open("queues.json");
            int sizeOfFile = inputStream.available();
            byte[] bufferData = new byte[sizeOfFile];
            inputStream.read(bufferData);
            inputStream.close();
            json = new String(bufferData, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return json;
    }
    public void deconnectionAlertDialog() {
        AlertDialog.Builder alert = new AlertDialog.Builder(this);
        alert.setTitle("Déconnetion... ");
        alert.setMessage("Êtes-vous vraiment en pause ?");
        alert.setPositiveButton("Oui", (dialog, which) -> {
            Intent intent = new Intent(ctx, MainActivity.class);
            startActivity(intent);
        });
        alert.setNegativeButton("Non", (dialog, which) -> {
        });
        alert.create().show();
    }
    public void timeFinishedAlertDialog() {
        AlertDialog.Builder alert = new AlertDialog.Builder(this);
        alert.setTitle("Temps écoulé... ");
        alert.setMessage("Passer au client suivent ?");
        alert.setNegativeButton("Non", (dialog, which) -> {
            deconnectionAlertDialog();
        });
        alert.setPositiveButton("Oui", (dialog, which) -> {
            Intent intent = new Intent(ctx, HomePageActivity.class);
            startActivity(intent);
        });
        alert.create().show();
    }
    //Traitement des boutons
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.confirm_btn_id:
//                confirmPresence();
                break;
            case R.id.terminate_btn_id:
                terminateService(idCommerce);
                break;
            case R.id.deconnection_btn_id:
                deconnection();
                break;
        }
    }
    public void terminateService(String idCommerce) {
//        public void terminateService(String idCommerce) {
        Intent intent = new Intent(ctx, HomePageActivity.class);
        intent.putExtra("idCommerceVarTemp", idCommerce);
        startActivity(intent);
//        inviteBtn.setEnabled(true);
//        inviteBtn.setText("Inviter client");
//        inviteBtn.setTextColor(Color.parseColor("#008000"));
//        deconnectionBtn.setEnabled(true);
//        deconnectionBtn.setText("Déconnection");
        Toast.makeText(this, "Si vous êtes pret", Toast.LENGTH_SHORT).show();
        Toast.makeText(this, "clicker \"INVITER CLIENT\"", Toast.LENGTH_SHORT).show();
    }
    public void deconnection() {
        Intent intent = new Intent(ctx, MainActivity.class);
        startActivity(intent);
        Toast.makeText(this, "Vous êtes déconnecté", Toast.LENGTH_SHORT).show();
    }
}