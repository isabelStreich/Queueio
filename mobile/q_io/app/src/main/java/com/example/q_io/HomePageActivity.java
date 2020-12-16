package com.example.q_io;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.SystemClock;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ExecutionException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
public class HomePageActivity extends AppCompatActivity implements View.OnClickListener {
    Context ctx;
    private ImageView companyLogo;
    private TextView companyName;
    private TextView chronometer;
    private TextView dateApp;
    private TextView timeApp;
    private TextView tempsText;
    public TextView totalInQueue;
    public TextView currentNumber;
    private Button confirmBtn;
    private Button inviteBtn;
    private Button terminateServiceBtn;
    private Button deconnectionBtn;
    Chronometer chronometer_up;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        ctx = this;
        Intent intent;
        intent = getIntent();
        String idCommerce = intent.getStringExtra("idCommerceVarTemp");
        companyLogo = (ImageView) findViewById(R.id.company_logo_id);
        companyName = (TextView) findViewById(R.id.company_name_id);
        totalInQueue = (TextView) findViewById(R.id.total_queue_id);
        currentNumber = (TextView) findViewById(R.id.current_number_id);
        chronometer = (TextView) findViewById(R.id.chronometer_id);
        Button confirmBtn = (Button) findViewById(R.id.confirm_btn_id);
        Button inviteBtn = (Button) findViewById(R.id.invite_btn_id);
        Button terminateServiceBtn = (Button) findViewById(R.id.terminate_btn_id);
        Button deconnectionBtn = (Button) findViewById(R.id.deconnection_btn_id);
        chronometer_up = findViewById(R.id.count_up);
        tempsText = (TextView) findViewById(R.id.temps_text_id);
        terminateServiceBtn.setEnabled(false);
        ClassConnection connection = new ClassConnection();
        try {
            String response = connection.execute("https://queueio.herokuapp.com/commerceById/" + idCommerce).get();
            JSONArray jsonArray = new JSONArray(response);
            JSONObject jsonObject = jsonArray.getJSONObject(0);
//                String numeroActuelVarTemp = jsonObject.getString("numero_actuel");
//                String totalNumeroPrisVarTemp = jsonObject.getString("total_numero_pris");
            String companyNameVarTemp = jsonObject.getString("nom");
            Toast.makeText(this, idCommerce, Toast.LENGTH_SHORT).show();
//                currentNumber.setText(numeroActuelVarTemp);
//                totalInQueue.setText(totalNumeroPrisVarTemp);
            companyName.setText(companyNameVarTemp);
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        final Handler handler = new Handler();
        handler.post(new Runnable() {
            @Override
            public void run() {
                if (true) {
                    ClassConnection connection = new ClassConnection();
                    try {
                        String response = connection.execute("https://queueio.herokuapp.com/redis/listClient/" + idCommerce).get();
                        JSONArray jsonArray = new JSONArray(response);
                        if (jsonArray.length() != 0) {
                            List<String> list = new ArrayList<String>();
                            for (int i = 0; i < jsonArray.length(); i++) {
                                list.add(jsonArray.getString(i));
                            }
                            currentNumber.setText(list.get(0) + "");
                            totalInQueue.setText(list.size() + "");
                            inviteBtn.setEnabled(true);
                        } else {
                            currentNumber.setText("Pas de client");
                            totalInQueue.setText("Pas de client");
                            inviteBtn.setEnabled(false);
                        }
                    } catch (ExecutionException e) {
                        e.printStackTrace();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    handler.postDelayed(this, 1000);
                }
            }
        });
        terminateServiceBtn.setOnClickListener(v -> {
            inviteBtn.setEnabled(true);
            inviteBtn.setText("Inviter client");
            tempsText.setText("Bonne journée !");
            chronometer_up.setText("");
            chronometer_up.setBase(SystemClock.elapsedRealtime());
            chronometer_up.stop();
            deconnectionBtn.setEnabled(true);
            deconnectionBtn.setText("Déconnection");
            confirmBtn.setText("Confirmer la présence du client");
            confirmBtn.setEnabled(false);
            chronometer.setText("");
            terminateServiceBtn.setEnabled(false);
        });
//        Appel JSON pour tester
        try {
            JSONObject jsonObject = new JSONObject(JsonDataFromAsset());
            JSONArray jsonArray = jsonObject.getJSONArray("queues");
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject userData = jsonArray.getJSONObject(i);
//                companyName.setText(userData.getString("commerce_id"));
                companyLogo.setImageResource(R.drawable.logo_rbc);
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
//        terminateServiceBtn.setOnClickListener(this);
        JSONObject userData = new JSONObject();
        deconnectionBtn.setOnClickListener(v -> deconnectionAlertDialog());
        tempsText.setText(" Bonne journée !");
        inviteBtn.setOnClickListener(v1 -> {
            confirmBtn.setEnabled(true);
            ClassConnection connect = new ClassConnection();
            int milisecs = 0;
            try {
                String response = connect.execute("https://queueio.herokuapp.com/commerceConfigid/" + idCommerce).get();
                JSONArray jsonArray = new JSONArray(response);
                JSONObject jsonObject = jsonArray.getJSONObject(0);
                milisecs = Integer.parseInt(jsonObject.getString("nb_minutes_retard"));
                Toast.makeText(this, idCommerce, Toast.LENGTH_SHORT).show();
            } catch (ExecutionException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }
            new CountDownTimer(10000, 1000) {
                public void onTick(long millisUntilFinished) {
                    chronometer.setText(millisUntilFinished / 1000 + " sec.");
                    inviteBtn.setEnabled(false);
                    deconnectionBtn.setEnabled(false);
                    deconnectionBtn.setText("");
                    tempsText.setText("Temps d'attente du client");
                    if (confirmBtn.isPressed() == true) {
                        terminateServiceBtn.setEnabled(true);
                        cancel();
                        chronometer_up.setText("");
                        chronometer_up.setBase(SystemClock.elapsedRealtime());
                        confirmBtn.setOnClickListener(view -> chronometer_up.start());
                        inviteBtn.setText("Soyons gentils avec tous les clients");
                        confirmBtn.setText("En service");
                        confirmBtn.setTextColor(Color.parseColor("#008000"));
                        inviteBtn.setTextColor(Color.parseColor("#008000"));
                        inviteBtn.setEnabled(false);
                        tempsText.setText("Attention ! ");
                        tempsText.setTextColor(Color.parseColor("#ff0000"));
                        chronometer.setText("30 min. max. pour la visite !");
                        chronometer.setTextColor(Color.parseColor("#636363"));
                        deconnectionBtn.setEnabled(false);
                        deconnectionBtn.setTextColor(Color.parseColor("#ff0000"));
                        deconnectionBtn.setText("Client servi !");
                        ClassConnection connect = new ClassConnection();
                        try {
                            connect.execute("https://queueio.herokuapp.com/incrementCptServi/" + idCommerce).get();
                        } catch (ExecutionException e) {
                            e.printStackTrace();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        ClassConnection connection = new ClassConnection();
                        try {
                            String response = connection.execute("https://queueio.herokuapp.com/deleteClientServi/" + idCommerce).get();
                        } catch (ExecutionException e) {
                            e.printStackTrace();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    } else {
                        inviteBtn.setTextColor(Color.parseColor("#ff0000"));
                        inviteBtn.setText("Attendre le client ...");
//                        inviteBtn.setEnabled(true);
                        deconnectionBtn.setEnabled(false);
                        deconnectionBtn.setText("");
                    }
                }
                public void onFinish() {
                    timeFinishedAlertDialog(idCommerce);
                    ClassConnection connection = new ClassConnection();
                    try {
                        String response = connection.execute("https://queueio.herokuapp.com/deleteClientServi/" + idCommerce).get();
                    } catch (ExecutionException e) {
                        e.printStackTrace();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    ClassConnection connect = new ClassConnection();
                    try {
                        connect.execute("https://queueio.herokuapp.com/incrementCptQuitte/" + idCommerce).get();
                    } catch (ExecutionException e) {
                        e.printStackTrace();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    tempsText.setText("Temps écoulé...");
                    chronometer.setText("Passer au client suivent ?");
                    chronometer_up.stop();
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
        alert.setTitle("Déconnetion: ");
        alert.setMessage("Êtes-vous en pause ?");
        alert.setPositiveButton("Oui", (dialog, which) -> {
            Intent intent = new Intent(ctx, MainActivity.class);
            startActivity(intent);
        });
        alert.setNegativeButton("Non", (dialog, which) -> {
        });
        alert.create().show();
    }
    public void timeFinishedAlertDialog(String idCommerce) {
        AlertDialog.Builder alert = new AlertDialog.Builder(this);
        alert.setTitle("Temps écoulé... ");
        alert.setMessage("Passer au client suivent ?");
        alert.setNegativeButton("Non", (dialog, which) -> {
            deconnectionAlertDialog();
        });
        alert.setPositiveButton("Oui", (dialog, which) -> {
        });
        alert.create().show();
    }
    //Traitement des boutons
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.confirm_btn_id:
                break;
            case R.id.deconnection_btn_id:
                deconnection();
                break;
        }
    }
    public void deconnection() {
        Intent intent = new Intent(ctx, MainActivity.class);
        startActivity(intent);
        Toast.makeText(this, "Vous êtes déconnecté", Toast.LENGTH_SHORT).show();
    }
}