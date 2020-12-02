package com.example.q_io;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.os.Bundle;
import android.view.View;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
public class RecyclerView extends AppCompatActivity {
    androidx.recyclerview.widget.RecyclerView recyclerView;
    ArrayList<String> commerce = new ArrayList<>();
    ArrayList<String> password = new ArrayList<>();
    ArrayList<String> email = new ArrayList<>();
    ArrayList<String> current_number = new ArrayList<>();
    ArrayList<String> date = new ArrayList<>();
    ArrayList<String> totalInQueue = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recycler_view);
        recyclerView = findViewById(R.id.recyclerView_id);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getApplicationContext());
        recyclerView.setLayoutManager(linearLayoutManager);
        try {
            JSONObject jsonObject = new JSONObject(JsonDataFromAsset());
            JSONArray jsonArray = jsonObject.getJSONArray("queues");
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject userData = jsonArray.getJSONObject(i);
                commerce.add(userData.getString("commerce_id"));
                password.add(userData.getString("password"));
                email.add(userData.getString("email"));
                current_number.add(userData.getString("current_number"));
                date.add(userData.getString("date"));
                totalInQueue.add(userData.getString("totalInQueue"));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        HelperAdapter helperAdapter = new HelperAdapter(commerce, password, email, current_number, date, totalInQueue, RecyclerView.this);
        recyclerView.setAdapter(helperAdapter);
    }
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
}