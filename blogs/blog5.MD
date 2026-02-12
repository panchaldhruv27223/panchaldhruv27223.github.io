ProGAN is what you are looking for.
Dhruv Panchal
Dhruv Panchal
6 min read
·
Aug 20, 2025





we see this topic as generating high resolution image from low resolution image.

Hey everyone! I’m excited to share about my latest project where I’m using ProGAN (Progressive Growing of GANs, an advanced type of Generative Adversarial Network that trains models by gradually increasing image resolution for better stability and quality) to enhance low-resolution images (images with fewer pixels, making them blurry or pixelated) into stunning high-resolution versions (images with more pixels, resulting in sharper and more detailed visuals). If you’re new to AI (Artificial Intelligence, the simulation of human intelligence in machines) and machine learning (a subset of AI where algorithms learn patterns from data without explicit programming), don’t worry — I’ll break it down step by step so it’s easy to follow. In this blog, we’ll explore what ProGAN is, how it works, and why it’s a game-changer for image generation (creating new images from scratch using AI) and enhancement. Let’s get started!

What Are GANs? The Basics

Before we dive into ProGAN, let’s talk about GANs, which stand for Generative Adversarial Networks (a class of AI models where two neural networks compete to generate realistic data). GANs are a type of AI model invented by Ian Goodfellow in 2014. They’re like two artists competing in a contest:

The Generator (the network that creates fake data, such as images, from input like random noise): This is the ‘forger.’ It creates fake images from random noise (a vector of random numbers used as starting input to produce varied outputs), trying to make them look as real as possible.
Discriminator (the network that evaluates whether data is real or fake): This is the ‘critic.’ It looks at images and decides if they’re real (from a dataset, a collection of real-world data used for training) or fake (from the generator).
The two ‘fight’ during training: The generator gets better at fooling the discriminator, and the discriminator gets better at spotting fakes. Over time, the generator learns to produce incredibly realistic images. GANs have been used for everything from creating art to deepfakes (synthetic media where a person’s likeness is realistically altered or generated).

But there’s a catch — training GANs can be tricky, especially for high-resolution images (like 1024x1024 pixels, where pixels are the tiny dots that make up an image). They often ‘collapse’ in mode collapse (a failure where the generator produces limited varieties of outputs, ignoring diversity in the data) or become unstable (the training process fluctuates wildly and doesn’t converge to good results).

Enter ProGAN: Progressive Growing of GANs
ProGAN, short for Progressive Growing of GANs is a smart upgrade to regular GANs. It was developed by researchers at NVIDIA (a company specializing in graphics processing units or GPUs, hardware that accelerates AI computations, and AI technologies) in 2017 (from the paper ‘Progressive Growing of GANs for Improved Quality, Stability, and Variation’).

The big idea?

Here’s how it works in simple terms:

1. Start Low-Res: Training begins with tiny images, say 4x4 pixels. Both the generator and discriminator are simple networks at this stage, focusing on basic shapes and colors.

2. Add Layers Progressively: As training progresses, new layers are added to both networks to double the resolution (e.g., from 4x4 to 8x8, then 16x16, and so on, up to 1024x1024). This happens in phases:

— Old layers stay trainable, so the model doesn’t forget what it learned.
— New layers are “faded in” smoothly over time (using a blending factor called alpha that goes from 0 to 1, a parameter that gradually increases the influence of new layers) to avoid shocks to the training process.

3. Why This Helps:

—Stability: By mastering low-res first, the model avoids the chaos of handling too much detail too soon.
— Speed: Most training happens at lower resolutions, making it 2 - 6 times faster than traditional methods.
— Quality and Variety: ProGAN produces sharper, more diverse images with fewer artifacts (unwanted distortions or glitches in generated images).

ProGAN was a breakthrough- it generated the first ultra-realistic faces at high resolutions, paving the way for models like StyleGAN (an advanced GAN that allows fine-grained control over styles in generated images).

Press enter or click to view image in full size
Figure 1: Our training starts with both the generator (G) and discriminator (D) having a low spa- tial resolution of 4×4 pixels. As the training advances, we incrementally add layers to G and D, thus increasing the spatial resolution of the generated images. All existing layers remain trainable throughout the process. Here N × N refers to convolutional layers operating on N × N spatial resolution. This allows stable synthesis in high resolutions and also speeds up training considerably. One the
Figure 1: Our training starts with both the generator (G) and discriminator (D) having a low spa-
tial resolution of 4×4 pixels. As the training advances, we incrementally add layers to G and D,
thus increasing the spatial resolution of the generated images. All existing layers remain trainable
throughout the process. Here N × N refers to convolutional layers operating on N × N spatial
resolution. This allows stable synthesis in high resolutions and also speeds up training considerably.
One the right we show six example images generated using progressive growing at 1024 × 1024.
To illustrate the progressive growing process, let’s look at Figure 1 from the original paper.

It shows how training starts with both the generator (G) and discriminator (D) at a low spatial resolution of 4 × 4 pixels. As training advances, layers are incrementally added to increase the resolution up to 1024 × 1024.

Become a member
All existing layers remain trainable. The figure includes a schematic of the network growth, with labels like ‘N × N’ for convolutional layers (layers that apply filters to extract features from images) operating on N × N resolution. On the right, it displays six example high-resolution (1024 × 1024) images generated using this method, showcasing realistic faces or objects. This visual highlights how starting small leads to stable high-quality outputs.

Press enter or click to view image in full size
Figure 2: When doubling the resolution of the generator (G) and discriminator (D) we fade in the new layers smoothly. This example illustrates the transition from 16 × 16 images (a) to 32 × 32 images ©. During the transition (b) we treat the layers that operate on the higher resolution like a residual block, whose weight α increases linearly from 0 to 1. Here 2× and 0.5× refer to doubling and halving the image resolution using nearest neighbor filtering and average pooling, respectively. The t
Figure 2: When doubling the resolution of the generator (G) and discriminator (D) we fade in the
new layers smoothly. This example illustrates the transition from 16 × 16 images (a) to 32 × 32
images ©. During the transition (b) we treat the layers that operate on the higher resolution like a
residual block, whose weight α increases linearly from 0 to 1. Here 2× and 0.5× refer to doubling
and halving the image resolution using nearest neighbor filtering and average pooling, respectively.
The toRGB represents a layer that projects feature vectors to RGB colors and fromRGB does
the reverse; both use 1 × 1 convolutions. When training the discriminator, we feed in real images
that are downscaled to match the current resolution of the network. During a resolution transition,
we interpolate between two resolutions of the real images, similarly to how the generator output
combines two resolutions.
Figure 2 demonstrates the smooth fading-in of new layers when doubling resolution, e.g., from 16 × 16 to 32 × 32.

It’s divided into three parts:

(a) the initial low-res state,

(b) the transition where new layers act as a residual block (a block that adds shortcuts to help training deep networks) with alpha increasing from 0 to 1, and

(c) the full high-res state.

It includes labels like “ 2 X ” for upsampling (increasing resolution using methods like nearest neighbor filtering) and “ 0.5 X ” for downsampling (reducing resolution with average pooling), plus “toRGB” and “fromRGB” for layers converting features to/from RGB colors using 1 × 1 convolutions. This figure explains how the fade-in prevents training disruptions.

ProGAN in Action: From Image Generation to Super-Resolution
Originally, ProGAN is designed for generating new images from scratch (e.g., fake celebrity faces). It takes random noise as input and outputs high-res images. But in my project, I’m adapting progressive GAN techniques for super-resolution (the process of upscaling low-res images to high-res while adding realistic details): taking a blurry, low-res image (like an old photo) and upscaling it to high-res while adding realistic details.

How does this fit?

While standard ProGAN is for unconditional generation (generating without specific conditions), researchers have extended the progressive idea to super-resolution tasks. For example:

In super-resolution GANs (like SRGAN, a GAN specifically for super-resolution that uses adversarial training for realistic upscaling), the generator upsamples low-res inputs, and the discriminator checks realism.
Progressive variants, such as P-GAN (Progressive GAN for medical images, a variant applying progressive growing to specific domains), use multi-stage training: Start with basic upscaling, then add stages to refine details step by step. This uses a “triplet loss” (a loss function comparing an anchor, positive, and negative sample to improve similarity learning) to compare improvements across stages, making it great for high scaling factors (e.g., 4x or 8x upscale, multiplying resolution by that factor).
This approach addresses common super-resolution issues, such as:

- Over-smoothing (making images too blurry, losing details).

- Hallucinations (adding fake details that don’t match the original image).

Why ProGAN Matters
ProGAN’s progressive training method offers key advantages:
- High-Quality Outputs: It generates sharp, detailed images at resolutions up to 1024x1024, far surpassing traditional GANs.

- Real-World Applications: Beyond generating images, ProGAN’s techniques are used in super-resolution for enhancing old photos, improving medical imaging (e.g., clearer MRI scans), and upscaling textures in video games.

- Foundation for Future Models: ProGAN inspired advancements like StyleGAN, which powers modern AI art and face generation tools.

Wrapping Up

ProGAN is a brilliant approach to training GANs by growing networks step by step, leading to stable, high-quality, and diverse image outputs. Whether generating new images from scratch or enhancing low-res images through super-resolution, ProGAN has transformed AI-driven image processing. If you’re curious to explore, check out PyTorch or TensorFlow libraries with ProGAN implementations to get started.

Thanks for reading! Drop questions in the comments, and stay tuned for more in our GAN series. What’s your favorite AI image tool? Let me know!

See My Code : https://github.com/panchaldhruv27223/ProGANS_cv
