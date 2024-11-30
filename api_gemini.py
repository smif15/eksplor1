import google.generativeai as genai

API = 'AIzaSyBmF2loRqAxx3Scjum_UatILg4s1pWeM2M'


def generate_respons(user_input = ""):
    genai.configure(api_key=API)
    model = genai.GenerativeModel("gemini-1.5-flash")

    user_input = "Apa ibu kota Belarus?"

    prompt_system = " Berikanlah jawabannya secara akurat, singkat, dan ringkas!"
    response = model.generate_content(user_input + prompt_system)

    return response.text

    #print(response.text)