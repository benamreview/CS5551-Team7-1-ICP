package tutorial.cs5551.com.translateapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.TextView;

//AppCompatActivity:
public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
    //This is where the identity check is. The main variable is the validation flag. If it is false, then the user
    //will not go anywhere beyond the login page. Else if the user enters the right username and password, he will be directed
    //to the next page. Username and password are determined by the 2 variables "userName" and "password"
    public void checkCredentials(View v)
    {
        EditText usernameCtrl = (EditText)findViewById(R.id.txt_uname);
        EditText passwordCtrl = (EditText) findViewById(R.id.txt_Pwd);
        TextView errorText = (TextView)findViewById(R.id.lbl_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

        boolean validationFlag = false;
        //Verify if the username and password are not empty.
        //Username and password have been changed to my own credentials, which are
        // "DuyHo" and "CS5551"
        if(!userName.isEmpty() && !password.isEmpty()) {
            if(userName.equals("DuyHo") && password.equals("CS5551")) {
                validationFlag = true;

            }
        }
        if(!validationFlag)
        {
            errorText.setVisibility(View.VISIBLE); //if the credentials do not match, show the error message
        }
        else
        {
            //This code redirects the from login page to the home page.
            //If the credentials match, user will be directed to the translate activity page where
            //the main operation is.
            Intent redirect = new Intent(LoginActivity.this, TranslateActivity.class);
            startActivity(redirect);
        }

    }
}
