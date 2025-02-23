#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <unordered_map>
#include <limits>
#include <cctype>

using namespace std;

int solution(const vector<string>& data) {
    unordered_map<string, int> total_costs;
    vector<string> add_types = {"Pilot", "Fuel", "Maintenance", "Docking", "Tax"};
    vector<string> subtract_types = {"Discount", "Rebate"};

    for (const string& line : data) {
        try {
            Transaction t = parseLine(line);
            
            if (total_costs.find(t.crew) == total_costs.end()) {
                total_costs[t.crew] = 0;
            }

            if (find(add_types.begin(), add_types.end(), t.cost_type) != add_types.end()) {
                total_costs[t.crew] += t.amount;
            } else if (find(subtract_types.begin(), subtract_types.end(), t.cost_type) != subtract_types.end()) {
                total_costs[t.crew] -= t.amount;
            }
        } catch (const exception& e) {
            // Log error or continue based on requirements
            cerr << "Skipping invalid line: " << e.what() << endl;
        }
    }

    if (total_costs.empty()) return 0;

    int min_cost = numeric_limits<int>::max();
    for (const auto& entry : total_costs) {
        min_cost = min(min_cost, entry.second);
    }

    return min_cost;
}
