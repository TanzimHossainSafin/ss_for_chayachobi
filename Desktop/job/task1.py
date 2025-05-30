def total_mojos_consumed(initial_mojos):
    mojos = initial_mojos
    mutkis = 0
    total_eaten = 0

    while mojos > 0:
        # Eat all mojos
        total_eaten += mojos
        mutkis += mojos
        mojos = 0

        # Exchange mutkis for mojos
        exchanged = mutkis // 3
        mutkis = mutkis % 3
        mojos += exchanged

    return total_eaten

if __name__ == "__main__":
    result = total_mojos_consumed(10)
    print(f"Total mojo consumed: {result}")
