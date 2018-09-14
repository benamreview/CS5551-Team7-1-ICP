package tutorial.cs5551.com.translateapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import android.widget.Spinner;
import android.widget.Toast;

public class TranslateActivity extends AppCompatActivity{

    //For this activity, there are two main components I have added:
    //Spinner and Spinner2, which stand for input and output languages, and
    //Correspond with the actual objects languagesIn_spinner and languages_Out spinner
    // which are placed in the content_translate.xml

    //These spinners will help construct 2 dropdown lists with a predetermined list of available languages
    //The list of languages is specified in the strings.xml file under the languagesIn_array and languagesOut_array
    String API_URL = "https://api.fullcontact.com/v2/person.json?";
    String API_KEY = "b29103a702edd6a";
    String sourceText;
    TextView outputTextView;
    Context mContext;
    Spinner spinner;
    Spinner spinner2;

    //These are the global variables that are used as dynamic variables in both methods.
    //They store user's selected option from the dropdown menus and their relative location within the array
    //in order to make the URL to the API more dynamic and easier to keep track of and make changes to.

    //There are a total of 8 languages in the list, therefore the range of index is from 0-7
    String inputLang;
    String outputLang;
    int inputLangId; //Actual index in the array.
    int outputLangId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_translate);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        outputTextView = (TextView) findViewById(R.id.txt_Result);

        //Initialization of the spinner
        //In order for a spinner to work, it needs to have an adapter to connect to it
        //to keep track of the variables in the <array> that is specified in the strings.xml
        spinner = (Spinner) findViewById(R.id.languagesIn_spinner);
        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.languagesIn_array, android.R.layout.simple_spinner_item); //specify the actual array to bind to
        // Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        spinner.setAdapter(adapter); //attach the adapter to the spinner to make it alive

        //This is the method that listens to the user's behavior whenever there is a change in the selected item. This will determine
        // the proper behavior. There are two mandatory methods to include:
        // onItemSelected and onNothingSelected()
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                inputLang = (String)parent.getItemAtPosition(position);
                inputLangId = (int) parent.getItemIdAtPosition(position);
                //Toast.makeText(parent.getContext(), "Selected: " + inputLang + inputLangId, Toast.LENGTH_LONG).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        //Similar to the notion of spinner1, spinner2 takes in the languagesOut_array instead of using the same array.
        //The reason is maybe the translator is only limited to writing certain languages or maybe able to read more.
        //Therefore, they should be separate from another.
        spinner2 = (Spinner) findViewById(R.id.languagesOut_spinner);
        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter2 = ArrayAdapter.createFromResource(this,
                R.array.languagesOut_array, android.R.layout.simple_spinner_item);
        // Specify the layout to use when the list of choices appears
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        spinner2.setAdapter(adapter2);
        spinner2.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                outputLang = (String)parent.getItemAtPosition(position);
                outputLangId = (int) parent.getItemIdAtPosition(position);
                //Toast.makeText(parent.getContext(), "Output Selected: " + outputLang + outputLangId, Toast.LENGTH_LONG).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }



        public void translateText(View v) {
            //This is the primary processing unit of the application
            //The steps are: based on the languages specified in the strings.xml method
            //Which is used to make a list for the drop-down menu, I created another array for shortcodes (short forms)
            //That corresponds to the order of the languages in the strings.xml.
            //For example, "en" will go with "English" and "es" will go with "Spanish", etc.

            //Secondly, based on the tracked index value in the function above, I used it for accessing the same
            //index for the shortLangs array to extract the corresponding short forms
            //and put it in the API.
            TextView sourceTextView = (TextView) findViewById(R.id.txt_Email);
            String shortLangs[] = {"en", "fr", "es", "vi", "de", "zh", "ru", "ja"};
            String shortInputLang = shortLangs[inputLangId]; //extracting short code for input
            String shortOutputLang = shortLangs[outputLangId]; //extracting short code for output
            sourceText = sourceTextView.getText().toString();
            //The API link is now modified to be accepting 3 parameters: Text user wants to translate, the source language, and the desired output language.
            String getURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                    "key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e." +
                    "c0b0a88bea31ba51f72504cc0cc42cf891ed90d2&text=" + sourceText +"&" +
                    "lang" + "=" + shortInputLang +"-" + shortOutputLang+"&[format=plain]&[options=1]&[callback=set]";
            final String response1 = "";

            //This is the module for extracting JSON and process JSON file from the API.
            OkHttpClient client = new OkHttpClient();
            try {
                Request request = new Request.Builder()
                        .url(getURL) //getURL is placed here.
                        .build();
                //this method will make an actual call to the yandex API
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    //If there is an error connecting to the server, onFailure will catch it
                    public void onFailure(Call call, IOException e) {
                        System.out.println(e.getMessage());
                    }
                    //Else, the call will procede with the API result and this method
                    //will create a JSONObject to store the JSON file from the server
                    //and extract variable "text" from the original JSON file
                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        final JSONObject jsonResult;
                        final String result = response.body().string();
                        try {
                            jsonResult = new JSONObject(result);
                            JSONArray convertedTextArray = jsonResult.getJSONArray("text");
                            final String convertedText = convertedTextArray.get(0).toString();

                            Log.d("okHttp", jsonResult.toString());
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    //This function will display the tranlated text back to the main View
                                    outputTextView.setText(convertedText);
                                }
                            });
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });


            } catch (Exception ex) {
                outputTextView.setText(ex.getMessage());

            }

    }

    //An additional log-out button for users who want to go back to the front page after
    //they finish the sessions.
    public void LogOut(View view){
        //This is the same format as the sign in button
        Intent redirect = new Intent(TranslateActivity.this, LoginActivity.class);
        startActivity(redirect);
    }

}
