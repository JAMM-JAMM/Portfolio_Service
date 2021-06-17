from demo import create_demo

demo = create_demo()

if __name__ == '__main__':
    demo.run(host='127.0.0.1', port=5000, debug=True)