package com.example.q_io;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
public class MainActivity extends AppCompatActivity {
    private EditText email;
    private EditText password;
    Button loginBtn;
    Context ctx;
    boolean isEmailValid, isPasswordValid;
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Definition de logo
        getSupportActionBar().setDisplayShowHomeEnabled(true);
//        getSupportActionBar().setIcon(R.drawable.peoples_queue);
        getSupportActionBar().setTitle("queue.io");
        setContentView(R.layout.activity_main);
        // Variables
        ctx = this;
        email = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);
        String user_email = "maria@gmail.com";
        String user_password = "maria";
        loginBtn = findViewById(R.id.login_btn_id);
        loginBtn.setOnClickListener(v ->
        {
            Intent intent = new Intent(ctx, HomePageActivity.class);
//            if (email.getText().toString().equals(user_email) && password.getText().toString().equals(user_password))
//            {
            startActivity(intent);
//            } else {
                setValidation();
//            }
        });
    }
    public void setValidation() {
        // Validation de courriel
        if (email.getText().toString().isEmpty()) {
            email.setError(getResources().getString(R.string.email_error));
            isEmailValid = false;
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email.getText().toString()).matches()) {
            email.setError(getResources().getString(R.string.error_invalid_email));
            isEmailValid = false;
        } else {
            isEmailValid = true;
        }
        // Validation de mot de passe
        if (password.getText().toString().isEmpty()) {
            password.setError(getResources().getString(R.string.password_error));
            isPasswordValid = false;
        } else if (password.getText().length() < 5) {
            password.setError(getResources().getString(R.string.error_invalid_password));
            isPasswordValid = false;
        } else {
            isPasswordValid = true;
        }
        if (isEmailValid && isPasswordValid) {
            Toast.makeText(getApplicationContext(), "Succès :)", Toast.LENGTH_SHORT).show();
        }
    }
}
