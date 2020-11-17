package com.example.q_io;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Patterns;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.widget.Toolbar;
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
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setIcon(R.drawable.peoples_queue);
        getSupportActionBar().setTitle("queue.io");
        setContentView(R.layout.activity_main);
        ctx = this;
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);
        loginBtn = findViewById(R.id.loginBtn);
        loginBtn.setOnClickListener(v -> {
            Intent intent = new Intent(ctx, HomePageActivity.class);
            SetValidation();
            startActivity(intent);
        });
    }
    public void SetValidation() {
        // Validation email
        if (email.getText().toString().isEmpty()) {
            email.setError(getResources().getString(R.string.email_error));
            isEmailValid = false;
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email.getText().toString()).matches()) {
            email.setError(getResources().getString(R.string.error_invalid_email));
            isEmailValid = false;
        } else {
            isEmailValid = true;
        }
        // Validation password
        if (password.getText().toString().isEmpty()) {
            password.setError(getResources().getString(R.string.password_error));
            isPasswordValid = false;
        } else if (password.getText().length() < 6) {
            password.setError(getResources().getString(R.string.error_invalid_password));
            isPasswordValid = false;
        } else {
            isPasswordValid = true;
        }
        if (isEmailValid && isPasswordValid) {
            Toast.makeText(getApplicationContext(), "Avec succès", Toast.LENGTH_SHORT).show();
        }
    }
}