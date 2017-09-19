class NeuralNetwork {
    constructor(lr, biasLr) {
        this.w = [random(-1, 1), random(-1, 1), random(-1, 1)];
        this.lr = lr;
        this.biasLr = biasLr;
    }

    activationFunc(n) {
        if (n >= 0) {
            return 1;
        } else return -1;
    }

    guess(inputs) {
        let sum = 0;
        inputs.push(1);
        for (let i = 0; i < this.w.length; i++) {
            sum += inputs[i] * this.w[i];
        }

        return this.activationFunc(sum);
    }

    guessY(x) {
        return -(this.w[2] / this.w[1]) - (this.w[0] / this.w[1]) * x;
    }

    train(inputs, target) {
        let guess = this.guess(inputs);
        let error = target - guess;
        inputs.push(1);
        for (let i = 0; i < this.w.length; i++) {
            console.log(inputs[i]);
            if (i == 2) {
                this.w[i] += error * inputs[i] * this.biasLr;
            }
            this.w[i] += error * inputs[i] * this.lr;
        }

        return guess == target ? true : false;
    }
}
