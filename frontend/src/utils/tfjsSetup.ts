import * as tf from '@tensorflow/tfjs';

/**
 * Initializes TensorFlow.js backend.
 * This is called to prepare the AI environment before running models.
 */
export const initTFJS = async () => {
  try {
    // Attempt to set WebGL backend for hardware acceleration
    await tf.setBackend('webgl');
    await tf.ready();
    console.log('TensorFlow.js initialized successfully.');
    console.log('Current backend:', tf.getBackend());
  } catch (error) {
    console.warn('WebGL backend not available, falling back to CPU.', error);
    try {
      await tf.setBackend('cpu');
      await tf.ready();
      console.log('TensorFlow.js CPU backend initialized.');
    } catch (fallbackError) {
      console.error('Failed to initialize TensorFlow.js completely:', fallbackError);
    }
  }
};
