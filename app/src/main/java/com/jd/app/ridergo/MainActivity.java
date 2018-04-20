package com.jd.app.ridergo;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.jd.app.ridergo.Driver.DriverLoginActivity;
import com.jd.app.ridergo.Rider.RiderLoginActivity;

public class MainActivity extends AppCompatActivity {
    public Button btDriver, btRider;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btDriver = (Button) findViewById(R.id.BtnDriver);
        btRider = (Button) findViewById(R.id.BtnRider);

        btRider.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent viewItem = new Intent(MainActivity.this, RiderLoginActivity.class);
                startActivity(viewItem);
                finish();
                return;
            }
        });

        btDriver.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent viewItem = new Intent(MainActivity.this, DriverLoginActivity.class);
                startActivity(viewItem);
                finish();
                return;
            }
        });
    }
}
