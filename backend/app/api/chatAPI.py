import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def get_hint_from_openai(student_code: str, solution_code: str) -> str:
    prompt = (
        "The student wrote the following code:\n"
        f"{student_code}\n\n"
        "The correct solution is:\n"
        f"{solution_code}\n\n"
        "Give the student a helpful, specific hint to guide them toward the solution. "
        "Do not reveal the solution. Just one short tip, please."
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful programming assistant."},
                {"role": "user", "content": prompt}
            ],
            max_completion_tokens=100
        )

        return response['choices'][0]['message']['content'].strip()

    except Exception as e:
        raise 'failed to get hint from openai {e}'
