import torch, open_clip
from PIL import Image
from IPython.display import display

model_name = 'RN50'
model, _, preprocess = open_clip.create_model_and_transforms(model_name)
tokenizer = open_clip.get_tokenizer(model_name)

path_to_your_checkpoints = 'checkpoints'

ckpt = torch.load(f"{path_to_your_checkpoints}/RemoteCLIP-{model_name}.pt", map_location="cpu")
message = model.load_state_dict(ckpt)
print(message)
model = model.eval()

text_queries = [
    "A busy airport with many aeroplanes.",
    "Satellite view of Hohai university.",
    "Satellite view of sydney",
    "A building next to a lake.",
    "Many people in a stadium.",
    "a cute cat",
]
text = tokenizer(text_queries)
image = Image.open("D:\\Materi Kuliah\\SKRIPSI\\Eksplor2\\server\\images\\airport.jpg").convert('RGB') #convert to rgb allows it to display as png if the jpg is in cmyk

image = preprocess(image).unsqueeze(0)

with torch.no_grad(), torch.cuda.amp.autocast():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)

    text_probs = (100.0 * image_features @ text_features.T).softmax(dim=-1).cpu().numpy()[0]

print(f'Predictions of {model_name}:')
for query, prob in zip(text_queries, text_probs):
    print(f"{query:<40} {prob * 100:5.1f}%")