Mastering TensorBoard with PyTorch: A Hands-On Guide with Fashion-MNIST
Dhruv Panchal
Dhruv Panchal
7 min read
·
May 31, 2025





The prerequisite is basic knowledge of Pytorch and good familiarity with Python.

What is TensorBoard and why we Should use it?

TensorBoard is a powerful visualization tool that comes with TensorFlow but integrates seamlessly with PyTorch to help machine learning practitioners monitor, analyze, and debug their models. Whether you’re tracking training metrics, visualizing model architectures, or profiling performance, TensorBoard provides an intuitive interface to make sense of your experiments.

Press enter or click to view image in full size
TensorBoard image
TensorBoard
In this blog, we’ll dive deep into TensorBoard’s capabilities in PyTorch, explaining the theory behind each feature and demonstrating its use with a practical example: training a convolutional neural network (CNN) on the Fashion-MNIST dataset for image classification.

We’ll cover everything from setting up experiments to visualizing embeddings. By the end, you’ll have a complete understanding of how to leverage TensorBoard to supercharge your PyTorch workflows. Let’s get started!

0. Setting Up the Environment
Before we dive into TensorBoard, let’s set up our environment. We’ll use PyTorch to build a CNN, Fashion-MNIST as our dataset, and TensorBoard to visualize the training process. Here’s what you need:

Install the required packages:

Python 3.6+
PyTorch and torchvision
TensorBoard
NumPy (for data handling)
A Jupyter Notebook (optional, for running TensorBoard inline)

## run the below code to install all dependencies
pip install torch torchvision tensorboard numpy 
pip install jupyter notebook
We’ll use Fashion-MNIST, a dataset of 28x28 grayscale images across 10 clothing categories (e.g., T-shirt, Trouser, Dress). It’s a great dataset for classification tasks, similar to MNIST but more challenging.

1. Organizing Experiments with SummaryWriter
TensorBoard organizes experiments using log directories. The SummaryWriter class in PyTorch’s torch.utils.tensorboard module writes logs to a specified directory, which TensorBoard reads to visualize results. By giving each experiment a unique log_dir, you can compare multiple runs (e.g., different learning rates or batch sizes) side by side in TensorBoard’s interface.

Let’s initialize a SummaryWriter for our Fashion-MNIST experiment. We’ll include hyperparameters in the directory name for clarity.

from torch.utils.tensorboard import SummaryWriter

# Create a unique log directory
writer = SummaryWriter(log_dir="runs/fashion_mnist_lr_0.001_bs_64") 
This creates a directory runs/fashion_mnist_lr_0.001_bs_64 where all logs for this experiment will be stored.

2. Logging Scalars
Scalars are single-value metrics like loss or accuracy, which you track over time (e.g., per epoch or step). TensorBoard plots these as line graphs, helping you monitor trends and diagnose issues like overfitting or underfitting. Use add_scalar to log individual metrics.

We’ll train a CNN on Fashion-MNIST and log training and validation loss/accuracy. First, let’s set up the dataset and model.

import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load Fashion-MNIST
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
trainset = torchvision.datasets.FashionMNIST(root='./data', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=64, shuffle=True)
testset = torchvision.datasets.FashionMNIST(root='./data', train=False, download=True, transform=transform)
testloader = torch.utils.data.DataLoader(testset, batch_size=64, shuffle=False)

# Define a simple CNN
class FashionCNN(nn.Module):
    def __init__(self):
        super(FashionCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3)
        self.conv2 = nn.Conv2d(32, 64, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 5 * 5, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(-1, 64 * 5 * 5)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = FashionCNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model. Parameters(), lr=0.001)
Now, let’s train the model and log scalars for training and validation.

epochs = 5
for epoch in range(epochs):
    model.train()
    train_loss, train_correct, train_total = 0.0, 0, 0
    for images, labels in trainloader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        train_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        train_total += labels.size(0)
        train_correct += (predicted == labels).sum().item()
    
    train_loss /= len(trainloader)
    train_acc = train_correct / train_total
    
    # Log scalars
    writer.add_scalar("Loss/train", train_loss, epoch)
    writer.add_scalar("Accuracy/train", train_acc, epoch)
    
    # Validation
    model.eval()
    val_loss, val_correct, val_total = 0.0, 0, 0
    with torch.no_grad():
        for images, labels in testloader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            val_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            val_total += labels.size(0)
            val_correct += (predicted == labels).sum().item()
    
    val_loss /= len(testloader)
    val_acc = val_correct / val_total
    
    # Log scalars
    writer.add_scalar("Loss/val", val_loss, epoch)
    writer.add_scalar("Accuracy/val", val_acc, epoch)
These scalars will appear as line graphs in TensorBoard under the “Scalars” tab, allowing you to track training and validation performance.

3. Logging Multiple Scalars Together
When you want to compare related metrics (e.g., training and validation loss) on the same plot, use add_scalars. This groups metrics under a single tag, making it easier to visualize relationships.

writer.add_scalars("Losses", {
    "train": train_loss,
    "val": val_loss
}, epoch)
Add this inside the training loop after calculating train_loss and val_loss. In TensorBoard, you’ll see both losses on the same plot under the “Losses” tag.

4. Logging Model Graph
TensorBoard can visualize your model’s architecture as a computational graph, showing layers, connections, and data flow. This is useful for debugging model design or sharing architectures.

Use add_graph with your model and a sample input.

# Get a batch of images
images, _ = next(iter(trainloader))
images = images.to(device)

# Log model graph
writer.add_graph(model, images)
In TensorBoard’s “Graphs” tab, you’ll see a visual representation of the CNN, including convolutional and fully connected layers.

5. Logging Images
Visualizing input images, model outputs, or intermediate features can help you understand what your model is processing. TensorBoard’s add_image logs images or grids of images, which is perfect for datasets like Fashion-MNIST.

Let’s log a grid of sample Fashion-MNIST images.

import torchvision.utils as vutils

# Create a grid of images
img_grid = vutils.make_grid(images[:8], normalize=True)
writer.add_image("Sample Images", img_grid, epoch)
Add this inside the training loop to log images per epoch. In TensorBoard’s “Images” tab, you’ll see a grid of clothing items.

6. Embedding Visualization
Embeddings are high-dimensional representations (e.g., features from a neural network layer). TensorBoard’s add_embedding projects these into 2D or 3D space using techniques like T-SNE or PCA, helping you visualize patterns in learned representations.

# Modify the model to return features
def get_features(model, images):
    model.eval()
    with torch.no_grad():
        x = model.pool(torch.relu(model.conv1(images)))
        x = model.pool(torch.relu(model.conv2(x)))
        x = x.view(-1, 64 * 5 * 5)
        features = model.fc1(x)
    return features

# Get features, labels, and images for a batch
images, labels = next(iter(testloader))
images, labels = images.to(device), labels.to(device)
features = get_features(model, images)

# Log embeddings
writer.add_embedding(features, metadata=labels.cpu(), label_img=images.cpu())
In TensorBoard’s “Projector” tab, you’ll see a 2D/3D scatter plot of the features, colored by class labels, with corresponding images.

7. Logging Histograms
Histograms show the distribution of model parameters (weights, biases) or their gradients over time. This helps you monitor how the model is learning and detect issues like vanishing gradients. Use add_histogram to log these distributions.

Become a member
Let’s log histograms for the model’s parameters and gradients.

for name, param in model.named_parameters():
    writer.add_histogram(name, param, epoch)
    if param.grad is not None:
        writer.add_histogram(f"{name}.grad", param.grad, epoch)
Add this inside the training loop. In TensorBoard’s “Histograms” tab, you’ll see distributions for each layer’s weights and gradients.

8. Profiling with TensorBoard
Profiling helps identify performance bottlenecks in your training pipeline, such as slow operations on CPU or GPU. PyTorch’s torch.profiler integrates with TensorBoard to visualize profiling data, showing time spent on each operation.

Let’s profile one training step.

from torch.profiler import profile, record_function, ProfilerActivity

with profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
             on_trace_ready=torch.profiler.tensorboard_trace_handler('./runs/profile')) as prof:
    with record_function("model_inference"):
        model(images)
This saves profiling data to runs/profile. In TensorBoard’s “Profiler” tab, you’ll see a detailed breakdown of computation times.

9. Using flush() in Long Loops
In long training loops, logs may not be written immediately, risking data loss if the program crashes. Calling writer.flush() periodically ensures logs are saved to disk.

Add flushing every 100 steps in the training loop.

step = 0
for epoch in range(epochs):
    model.train()
    for images, labels in trainloader:
        # Training code (as above)
        step += 1
        if step % 100 == 0:
            writer.flush()
This ensures logs are saved regularly, especially useful for long-running experiments.

10. Comparing Multiple Runs in TensorBoard
TensorBoard’s strength lies in comparing multiple experiments. By launching TensorBoard with the runs/ directory, you can toggle between different runs (e.g., different learning rates) to compare performance visually.

Run TensorBoard from the command line:

tensorboard --logdir=runs/
Open http://localhost:6006 in your browser to view all experiments. Toggle runs in the sidebar to compare metrics like loss or accuracy.

Bonus:
Running TensorBoard in Jupyter Notebook
If you’re working in a Jupyter Notebook, you can run TensorBoard inline using the %tensorboard magic command. This is convenient for quick experimentation without leaving your notebook.

In a Jupyter cell:

%load_ext tensorboard
%tensorboard --logdir runs
This embeds TensorBoard in your notebook, showing all visualizations.

Closing the SummaryWriter
Always close the SummaryWriter after training to ensure all logs are properly saved and resources are released.

At the end of training:

writer.close()
Best Practices
Avoid Over-Logging: Logging every step can slow down training and bloat log files. Log scalars per epoch or every few steps unless debugging.

Organize Log Directories: Use descriptive log_dir names (e.g., including hyperparameters) for easy comparison.

Check TensorBoard Regularly: Monitor visualizations during training to catch issues early.

Conclusion
TensorBoard is an indispensable tool for PyTorch users, offering a window into your model’s training process. By organizing experiments, logging scalars, visualizing graphs, and profiling performance, you can gain deep insights into your models. In this blog, we walked through each TensorBoard feature using a Fashion-MNIST classification example, combining theory with practical code. Try these techniques in your next PyTorch project, and you’ll be amazed at how much easier it is to debug and optimize your models!

let TensorBoard light the way to better machine learning!

