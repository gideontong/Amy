# a calculator for arithmetic sequences

def add(*args) -> float:
    output = 0
    for x in args:
        output = output + x
    return output

def subtract(*args) -> float:
    output = 0
    for x in args:
        output = output - x
    return output

def multiply(*args) -> float:
    output = 1
    for x in args:
        output = output * x
    return output

def divide(*args) -> float:
    output = 1
    for x in args:
        output = output / x