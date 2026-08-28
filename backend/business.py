def get_data():

    with open('names.txt') as f:

        names = f.read()
        names =names.split()

        for i, name in enumerate(names):
            print(f"{i+1}. {name}")

        return names
        
