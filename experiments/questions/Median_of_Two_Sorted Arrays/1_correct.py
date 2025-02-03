def solution(data):
    # Extract nums1 and nums2 from the input data
    nums1 = eval(data[0].split('=')[1].strip())
    nums2 = eval(data[1].split('=')[1].strip())

    # Implementation of findMedianSortedArrays
    n = len(nums1)
    m = len(nums2)
    i = 0
    j = 0
    m1 = 0
    m2 = 0

    # Find median
    for count in range(0, (n + m) // 2 + 1):
        m2 = m1
        if i < n and j < m:
            if nums1[i] > nums2[j]:
                m1 = nums2[j]
                j += 1
            else:
                m1 = nums1[i]
                i += 1
        elif i < n:
            m1 = nums1[i]
            i += 1
        else:
            m1 = nums2[j]
            j += 1

    # Check if the sum of n and m is odd
    if (n + m) % 2 == 1:
        return float(m1)
    else:
        ans = float(m1) + float(m2)
        return ans / 2.0

if __name__ == '__main__':
    data = [
        "nums1 = [1, 3]",
        "nums2 = [2]",
    ]
    print(solution(data))