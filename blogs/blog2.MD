Fine-Tuning U-Net for Satellite Image Segmentation
Dhruv Panchal
Dhruv Panchal
3 min read
·
Dec 27, 2024
3






Inthe last blog, we covered the theoretical foundations of U-Net, a cutting-edge architecture for image segmentation tasks. Now, let’s dive into the practical aspect: fine-tuning U-Net for a specific task — segmenting rooftops from satellite imagery. By customizing the model to our dataset, we aim to achieve high-accuracy segmentation results.

blog on U-Net it’s here: https://medium.com/@dhruv-panchal/understanding-the-u-net-model-revolutionizing-image-segmentation-48f4ba44b45c

Required Library
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.callbacks import ModelCheckpoint, ReduceLROnPlateau, EarlyStopping
from tensorflow.keras.optimizers import Adam
from segmentation_models import Unet
from segmentation_models.losses import DiceLoss
from segmentation_models.metrics import iou_score
import albumentations as A
from albumentations.core.composition import OneOf
from albumentations.core.transforms_interface import ImageOnlyTransform
from albumentations.augmentations.transforms import RandomCrop, HorizontalFlip, Rotate
from albumentations.augmentations.geometric.resize import Resize
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
import cv2
Dataset Preparation
Fine-tuning a U-Net model starts with proper dataset preparation. Here’s what we do:

Dataset Format: The dataset consists of satellite images and corresponding segmentation masks. Each pixel in a mask represents whether it belongs to the rooftop class or the background.

Preprocessing Steps:

Resizing: Images and masks are resized to a uniform size, such as 256x256 pixels.

Normalization: Image pixel values are scaled to the [0, 1] range.

Splitting: The dataset is divided into training, validation, and testing subsets.

Code Example:

def load_dataset(image_dir, mask_dir, target_size=(256, 256)):
    images = []
    masks = []
    for filename in os.listdir(image_dir):
        img_path = os.path.join(image_dir, filename)
        mask_path = os.path.join(mask_dir, filename.replace('.jpg', '.png'))
        # Load and resize image
        image = cv2.imread(img_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, target_size)
        
        # Load and resize mask
        mask = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE)
        mask = cv2.resize(mask, target_size)
        
        images.append(image)
        masks.append(mask)
        images = np.array(images, dtype=np.float32) / 255.0 # Normalize images
        masks = np.array(masks, dtype=np.float32) / 255.0 # Normalize masks
    return images, masksVisualization: Add side-by-side images showing an input satellite image and its corresponding mask.
Data Augmentation
To improve model generalization, data augmentation techniques are applied to the training dataset. These include:

Horizontal flips

Rotations

Adjustments to brightness and contrast

Code Example:

def augment_data(images, masks, augment_fn):
    augmented_images = []
    augmented_masks = []
    for img, mask in zip(images, masks):
        augmented = augment_fn(image=img, mask=mask)
        augmented_images.append(augmented['image'])
        augmented_masks.append(augmented['mask'])
    return np.array(augmented_images), np.array(augmented_masks)

augmentation_pipeline = A.Compose([
    A.HorizontalFlip(p=0.5),
    A.Rotate(limit=30, p=0.5),
    A.RandomBrightnessContrast(p=0.2),
    A.Resize(256, 256)
])
Visualization: Include examples comparing original and augmented images.

Model Customization
We use U-Net with a pre-trained ResNet34 encoder. Here’s why:

Why ResNet34? Pre-trained models like ResNet34 offer excellent feature extraction, especially when data is limited.

Activation Function: The sigmoid activation function is ideal for binary segmentation tasks.

Code Example:

input_shape = (256, 256, 3)
model = Unet(
    backbone_name='resnet34',
    input_shape=input_shape,
    encoder_weights='imagenet',
    classes=1,
    activation='sigmoid'
)
Compilation and Loss Function

Become a member
To compile the model, we use:

Loss Function: Dice Loss focuses on regions of overlap between predicted and actual masks.

Metrics: IoU (Intersection over Union) measures the accuracy of segmentation.

Code Example:

model.compile(
    optimizer=Adam(learning_rate=1e-4),
    loss=DiceLoss(),
    metrics=[iou_score]
)
Training Process
Training is enhanced with callbacks to manage the process effectively:

Model Checkpoint: Saves the best model based on validation loss.

Reduce LR on Plateau: Reduces the learning rate when validation performance stagnates.

Early Stopping: Stops training early if no improvement is observed.

Code Example:

callbacks = [
    ModelCheckpoint('unet_model.h5', monitor='val_loss', save_best_only=True, mode='min'),
    ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=5, min_lr=1e-6),
    EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
]

history = model.fit(
    X_train_aug, y_train_aug,
    validation_data=(X_val, y_val),
    epochs=50,
    batch_size=16,
    callbacks=callbacks
)

evaluation = model.evaluate(X_val, y_val)
print(f"Validation Loss: {evaluation[0]} - Validation IoU: {evaluation[1]}")
Learning Curve: Plot graphs showing training and validation loss/IoU over epochs.

Results
Evaluation Metrics:

Validation Loss, Validation IoU

Visual Comparison:

Show side-by-side examples of ground truth masks and predicted masks.

Code Example:

evaluation = model.evaluate(X_val, y_val)
print(f"Validation Loss: {evaluation[0]} - Validation IoU: {evaluation[1]}")
Key Challenges and Solutions
Imbalanced Classes: Dice Loss mitigates the impact of class imbalance by focusing on overlap.

Small Dataset: Pre-trained encoders help minimize the need for extensive data.

Overfitting: Data augmentation and early stopping effectively prevent overfitting.

Conclusion
Fine-tuning U-Net for satellite image segmentation is a powerful and adaptable technique. Following the steps outlined above, you can train U-Net for custom segmentation tasks. Stay tuned for the next blog, where we’ll discuss combining detection and segmentation models into a seamless pipeline.