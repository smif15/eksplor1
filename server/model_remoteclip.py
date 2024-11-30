import torch, open_clip
from PIL import Image
from io import BytesIO
import requests

model_name = 'RN50'
model, _, preprocess = open_clip.create_model_and_transforms(model_name)
tokenizer = open_clip.get_tokenizer(model_name)

path_to_your_checkpoints = 'checkpoints'

ckpt = torch.load(f"{path_to_your_checkpoints}/RemoteCLIP-{model_name}.pt", map_location="cpu")
message = model.load_state_dict(ckpt)
model = model.eval()

text_queries = [
    "A busy airport with many aeroplanes.",
    "Satellite view of Hohai university.",
    "Satellite view of sydney",
    "A building next to a lake.",
    "Many people in a stadium.",
    "a cute cat",
]

def remoteclip(image_path, query = text_queries):
    text = tokenizer(query)
    print('sampai tokenizer')
    response = requests.get(image_path)
    image = Image.open(BytesIO(response.content))
    
    image = preprocess(image).unsqueeze(0)

    with torch.no_grad(), torch.cuda.amp.autocast():
        image_features = model.encode_image(image)
        text_features = model.encode_text(text)
        image_features /= image_features.norm(dim=-1, keepdim=True)
        text_features /= text_features.norm(dim=-1, keepdim=True)

    text_probs = (100.0 * image_features @ text_features.T).softmax(dim=-1).cpu().numpy()[0]

    # Membuat dictionary dari pasangan zip
    result = [{"query": q, "probability": float(prob)} for q, prob in zip(query, text_probs)]

    return result

if __name__ == '__main__':
    print(remoteclip('http://localhost:3000/uploads/airport.jpg'))
